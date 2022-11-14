package com.openblocks.domain.folder.service;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.annotation.Nullable;

import org.apache.commons.lang3.StringUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Tree<T, F> extends FolderNode<T, F> {
    private static final int DEFAULT_DEPTH = 1;
    private final int maxDepth;
    private final Map<String, FolderNode<T, F>> folderId2FolderNodeMap;

    public final Function<F, String> folderNodeIdExtractor;
    public final Function<F, String> folderNodeParentIdExtractor;
    public final Function<T, String> elementNodeParentIdExtractor;

    public Tree(List<F> folders,
            Function<F, String> folderNodeIdExtractor,
            Function<F, String> folderNodeParentIdExtractor,
            List<T> elements,
            Function<T, String> elementNodeParentIdExtractor,
            @Nullable Comparator<Node<T, F>> comparator) {
        this(folders, folderNodeIdExtractor, folderNodeParentIdExtractor, elements, elementNodeParentIdExtractor, DEFAULT_DEPTH, comparator);
    }

    public Tree(List<F> folders,
            Function<F, String> folderNodeIdExtractor,
            Function<F, String> folderNodeParentIdExtractor,
            List<T> elements,
            Function<T, String> elementNodeParentIdExtractor,
            int maxDepth,
            @Nullable Comparator<Node<T, F>> comparator) {
        super(null, folderNodeIdExtractor, folderNodeParentIdExtractor, comparator);
        this.folderNodeIdExtractor = folderNodeIdExtractor;
        this.folderNodeParentIdExtractor = folderNodeParentIdExtractor;
        this.elementNodeParentIdExtractor = elementNodeParentIdExtractor;
        this.maxDepth = maxDepth;

        this.folderId2FolderNodeMap = folders.stream()
                .map(folder -> new FolderNode<>(folder, folderNodeIdExtractor, folderNodeParentIdExtractor, comparator))
                .collect(Collectors.toMap(FolderNode::id, Function.identity()));
        mount(this.folderId2FolderNodeMap.values());
        mount(elements.stream().map(element -> new ElementNode<T, F>(element, elementNodeParentIdExtractor)).toList());
    }

    private void mount(Collection<? extends Node<T, F>> nodes) {
        nodes.forEach(node -> {
            if (StringUtils.isBlank(node.parentId())) {
                children.add(node);
                node.setParent(this);
                return;
            }
            FolderNode<T, F> parent = folderId2FolderNodeMap.get(node.parentId());
            if (parent == null) {
                log.warn("error node: {}", node);
                // parent is not found, still put it in the tree
                children.add(node);
                node.setParent(this);
                return;
            }
            parent.getChildren().add(node);
            node.setParent(parent);
        });
    }

    public FolderNode<T, F> get(@Nullable String folderId) {
        if (StringUtils.isBlank(folderId)) {
            return this;
        }
        return folderId2FolderNodeMap.get(folderId);
    }

    @Override
    public String id() {
        throw new UnsupportedOperationException();
    }

    @Override
    public String parentId() {
        throw new UnsupportedOperationException();
    }

    @Override
    public String toString() {
        return "Tree{" +
                "maxDepth=" + maxDepth +
                ", children=" + children +
                '}';
    }
}
