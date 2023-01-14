package com.openblocks.api.material;

import static com.openblocks.infra.constant.NewUrl.MATERIAL_URL;

import java.time.Duration;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.openblocks.api.framework.view.ResponseView;
import com.openblocks.domain.material.model.MaterialType;
import com.openblocks.domain.material.service.meta.MaterialMetaService;
import com.openblocks.sdk.exception.BizError;
import com.openblocks.sdk.exception.BizException;
import com.openblocks.sdk.util.MediaTypeUtils;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(MATERIAL_URL)
public class MaterialController {

    private static final String DOWNLOAD_TYPE = "download";
    private static final String PREVIEW_TYPE = "preview";

    @Autowired
    private MaterialApiService materialApiService;
    @Autowired
    private MaterialMetaService materialMetaService;

    @PostMapping
    public Mono<ResponseView<MaterialView>> upload(@RequestBody UploadMaterialRequestDTO uploadMaterialRequestDTO) {
        return materialApiService.upload(uploadMaterialRequestDTO.getFilename(), uploadMaterialRequestDTO.getContent(),
                        uploadMaterialRequestDTO.getType())
                .map(materialMeta -> {
                    MaterialView view = MaterialView.builder()
                            .id(materialMeta.getId())
                            .filename(materialMeta.getFilename())
                            .build();
                    return ResponseView.success(view);
                });
    }

    /**
     * @param type {@link #DOWNLOAD_TYPE,#PREVIEW_TYPE}
     */
    @GetMapping("/{id}")
    public Mono<Void> download(@PathVariable String id,
            @RequestParam(value = "type", defaultValue = DOWNLOAD_TYPE) String type,
            ServerHttpResponse serverHttpResponse) {
        return materialMetaService.findById(id)
                .switchIfEmpty(Mono.error(new BizException(BizError.INVALID_PARAMETER, "FILE_NOT_EXIST")))
                .doOnNext(materialMeta -> {
                    HttpHeaders headers = serverHttpResponse.getHeaders();
                    if (PREVIEW_TYPE.equals(type)) {
                        headers.setContentDisposition(ContentDisposition.inline().filename(materialMeta.getFilename()).build());
                    } else {
                        headers.setContentDisposition(ContentDisposition.attachment().filename(materialMeta.getFilename()).build());
                    }
                    headers.setContentType(MediaTypeUtils.parse(materialMeta.getFilename()));
                    headers.setCacheControl(CacheControl.maxAge(Duration.ofHours(1)));
                })
                .flatMap(materialMeta -> serverHttpResponse.writeWith(materialApiService.download(materialMeta)))
                .then();
    }

    @GetMapping("/list")
    public Mono<ResponseView<List<MaterialView>>> getFileList() {
        return materialApiService.list()
                .map(ResponseView::success);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseView<Boolean>> delete(@PathVariable String id) {
        return materialApiService.delete(id)
                .thenReturn(ResponseView.success(true));
    }

    @Getter
    @Builder
    public static class MaterialView {
        private String id;
        private String filename;
    }

    @Data
    public static class UploadMaterialRequestDTO {

        private String filename;
        private String content;// in base64
        private MaterialType type;
    }
}
