package com.openblocks.api.authentication.dto;

import static com.openblocks.sdk.util.ExceptionUtils.ofError;

import org.apache.commons.lang.StringUtils;

import com.openblocks.api.framework.view.ResponseView;
import com.openblocks.sdk.exception.BizError;

import reactor.core.publisher.Mono;

public record OrganizationDomainCheckResult(String redirectDomain, boolean needBind) {

    public static OrganizationDomainCheckResult success() {
        return new OrganizationDomainCheckResult("", false);
    }

    public boolean needRedirect() {
        return StringUtils.isNotBlank(redirectDomain);
    }

    public boolean needBind() {
        return needBind;
    }

    public static OrganizationDomainCheckResult redirect(String redirectDomain) {
        return new OrganizationDomainCheckResult(redirectDomain, false);
    }

    public static OrganizationDomainCheckResult bind() {
        return new OrganizationDomainCheckResult("", true);
    }

    public Mono<ResponseView<?>> buildOrganizationDomainCheckView() {
        if (needRedirect()) {
            return Mono.just(ResponseView.success(BizError.REDIRECT.getBizErrorCode(),
                    RedirectView.builder()
                            .redirectUri("https://" + redirectDomain())
                            .build()));
        }
        if (needBind()) {
            return ofError(BizError.NEED_BIND_THIRD_PARTY_CONNECTION, "NEED_BIND_THIRD_PARTY_CONNECTION");
        }
        return Mono.empty();
    }
}
