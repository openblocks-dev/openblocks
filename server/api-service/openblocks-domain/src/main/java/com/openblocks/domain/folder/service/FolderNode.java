package com.openblocks.domain.folder.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;
import java.util.function.Consumer;
import java.util.function.Function;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FolderNode<T, F> implements Node<T, F> {

    private final F self;
    private FolderNode<T, F> parent;
    protected final Collection<Node<T, F>> children;
    @Nonnull
    private final Function<F, String> idExtractor;
    @Nonnull
    private final Function<F, String> parentIdExtractor;

    FolderNode(F self, @Nonnull Function<F, String> idExtractor, @Nonnull Function<F, String> parentIdExtractor,
            @Nullable Comparator<Node<T, F>> comparator) {
        this.self = self;
        this.idExtractor = idExtractor;
        this.parentIdExtractor = parentIdExtractor;
        this.children = comparator == null ? new ArrayList<>() : new PriorityQueue<>(comparator);
    }

    public String id() {
        return idExtractor.apply(self);
    }

    @Override
    public String parentId() {
        return parentIdExtractor.apply(self);
    }

    public final List<F> getFolderChildren() {
        return children.stream()
                .filter(node -> node instanceof FolderNode<T, F>)
                .map(node -> ((FolderNode<T, F>) node).getSelf())
                .toList();
    }

    public final List<T> getElementChildren() {
        return children.stream()
                .filter(node -> node instanceof ElementNode<T, F>)
                .map(node -> ((ElementNode<T, F>) node).getSelf())
                .toList();
    }

    public final List<F> getAllFolderChildren() {
        return this.children.stream()
                .map(node -> {
                    if (node instanceof FolderNode<T, F> folderNode) {
                        F self = folderNode.getSelf();
                        List<F> folderChildren = folderNode.getAllFolderChildren();
                        List<F> all = new ArrayList<>(folderChildren);
                        if (self != null) {
                            all.add(self);
                        }
                        return all;
                    }
                    return new ArrayList<F>();
                })
                .flatMap(List::stream)
                .toList();
    }


    /**
     * @param consumer will be called for children node first, then by parent node
     */
    public void postOrderIterate(Consumer<Node<T, F>> consumer) {
        children.forEach(node -> {
            if (node instanceof FolderNode<T, F> folderNode) {
                folderNode.postOrderIterate(consumer);
                return;
            }
            consumer.accept(node);
        });
        consumer.accept(this);
    }

    public final int depth() {
        if (parent == null) {
            return 1;
        }
        return parent.depth() + 1;
    }

    @Override
    public String toString() {
        return "FolderNode{" +
                "self=" + self +
                ", children=" + children +
                '}';
    }
}