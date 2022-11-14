package com.openblocks.api.query;

import static com.openblocks.infra.constant.NewUrl.LIBRARY_QUERY_RECORD_URL;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.openblocks.api.framework.view.ResponseView;
import com.openblocks.api.query.view.LibraryQueryRecordMetaView;
import com.openblocks.domain.query.model.LibraryQueryCombineId;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = LIBRARY_QUERY_RECORD_URL)
public class LibraryQueryRecordController {

    @Autowired
    private LibraryQueryRecordApiService libraryQueryRecordApiService;

    @DeleteMapping("/{libraryQueryRecordId}")
    public Mono<Void> delete(@PathVariable String libraryQueryRecordId) {
        return libraryQueryRecordApiService.delete(libraryQueryRecordId);
    }

    @GetMapping("/listByLibraryQueryId")
    public Mono<ResponseView<List<LibraryQueryRecordMetaView>>> getByLibraryQueryId(@RequestParam(name = "libraryQueryId") String libraryQueryId) {
        return libraryQueryRecordApiService.getByLibraryQueryId(libraryQueryId)
                .map(ResponseView::success);
    }

    @GetMapping
    public Mono<ResponseView<Map<String, Object>>> dslById(@RequestParam(name = "libraryQueryId") String libraryQueryId,
            @RequestParam(name = "libraryQueryRecordId") String libraryQueryRecordId) {
        LibraryQueryCombineId libraryQueryCombineId = new LibraryQueryCombineId(libraryQueryId, libraryQueryRecordId);
        return libraryQueryRecordApiService.getRecordDSLFromLibraryQueryCombineId(libraryQueryCombineId)
                .map(ResponseView::success);
    }

}
