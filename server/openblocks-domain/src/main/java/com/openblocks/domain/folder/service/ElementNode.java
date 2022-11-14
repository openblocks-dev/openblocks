package com.openblocks.domain.folder.service;

import java.util.function.Function;

import javax.annotation.Nonnull;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ElementNode<T, F> implements Node<T, F> {

    @Nonnull
    private final T self;
    @Nonnull
    private FolderNode<T, F> parent;
    @Nonnull
    private final Function<T, String> parentIdExtractor;

    ElementNode(@Nonnull T self, @Nonnull Function<T, String> parentIdExtractor) {
        this.self = self;
        this.parentIdExtractor = parentIdExtractor;
    }

    @Override
    public String parentId() {
        return parentIdExtractor.apply(self);
    }

    @Override
    public String toString() {
        return "ElementNode{" +
                "self=" + self +
                '}';
    }
}