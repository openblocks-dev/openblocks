package com.openblocks.api.util;

import static com.openblocks.sdk.exception.BizError.INVALID_PARAMETER;

import org.springframework.data.domain.PageRequest;

import com.openblocks.sdk.exception.BizException;

public class Pagination {

    private static final int MIN_PAGE = 1;
    private static final int MIN_SIZE = 5;
    private final int page;
    private final int size;
    private int maxSize = 100;
    private int maxPage = -1;

    public static Pagination of(int page, int size) {
        return new Pagination(page, size);
    }

    private Pagination(int page, int size) {
        this.page = page;
        this.size = size;
    }

    public Pagination withMaxSize(int maxSize) {
        this.maxSize = maxSize;
        return this;
    }

    public Pagination withMaxPage(int maxPage) {
        this.maxPage = maxPage;
        return this;
    }

    public Pagination check() {
        if ((maxPage > 0 && page > maxPage) || page <= 0) {
            throw new BizException(INVALID_PARAMETER, "ILLEGAL_PAGE_NUMBER", page);
        }
        return this;
    }

    public PageRequest toPageRequest() {
        return PageRequest.of(page() - 1, size()); // PageRequest start with page 0
    }

    public int page() {
        if (maxPage <= 0) {
            return Math.max(MIN_PAGE, page);
        }

        return Math.min(Math.max(MIN_PAGE, page), maxPage);
    }

    public int size() {
        return Math.min(Math.max(MIN_SIZE, size), maxSize);
    }
}
