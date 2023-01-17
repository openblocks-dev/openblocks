package com.openblocks.api.framework.service;

import static java.util.Optional.ofNullable;

import java.util.Locale;
import java.util.Locale.LanguageRange;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.server.ServerRequest;

@Service
public class GlobalContextServiceImpl implements GlobalContextService {

    @Override
    public Locale getClientLocale(ServerHttpRequest request) {
        return ofNullable(request.getHeaders().getFirst("accept-language"))
                .map(LanguageRange::parse)
                .filter(CollectionUtils::isNotEmpty)
                .map(languageRanges -> languageRanges.iterator().next())
                .map(LanguageRange::getRange)
                .map(Locale::forLanguageTag)
                .orElse(Locale.ENGLISH);
    }

    @Override
    public Locale getClientLocale(ServerRequest request) {
        return ofNullable(request.headers().firstHeader("accept-language"))
                .map(LanguageRange::parse)
                .filter(CollectionUtils::isNotEmpty)
                .map(languageRanges -> languageRanges.iterator().next())
                .map(LanguageRange::getRange)
                .map(Locale::forLanguageTag)
                .orElse(Locale.ENGLISH);
    }
}
