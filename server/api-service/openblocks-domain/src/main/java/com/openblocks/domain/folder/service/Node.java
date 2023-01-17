package com.openblocks.domain.folder.service;

public interface Node<T, F> {

    String parentId();

    void setParent(FolderNode<T, F> folderNode);
}