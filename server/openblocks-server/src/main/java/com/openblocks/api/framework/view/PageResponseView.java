package com.openblocks.api.framework.view;

import java.util.Collections;
import java.util.List;

import lombok.Getter;

@Getter
public class PageResponseView<T> extends ResponseView<List<T>> {

    private final int pageNum;
    private final int pageSize;
    private final int total;

    private PageResponseView(int code, String message, List<T> data, int pageNum, int pageSize, int total) {
        super(code, message, data);
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.total = total;
    }

    public static <T> PageResponseView<T> success(List<T> data, int pageNum, int pageSize, int total) {
        return new PageResponseView<>(SUCCESS, "", data, pageNum, pageSize, total);
    }

    public static <T> PageResponseView<T> error(int code, String message, int pageNum, int pageSize, int total) {
        return new PageResponseView<>(code, message, Collections.emptyList(), pageNum, pageSize, total);
    }
}
