package com.openblocks.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.Test;

import com.openblocks.api.application.view.ApplicationInfoView;
import com.openblocks.api.home.FolderInfoView;
import com.openblocks.domain.folder.service.FolderNode;
import com.openblocks.domain.folder.service.Tree;

public class TreeTest {

    static Map<String, String> app2FolderMap;
    static List<ApplicationInfoView> applicationInfoViews;
    static List<FolderInfoView> folderInfoViews;
    static Tree<ApplicationInfoView, FolderInfoView> tree;

    static {
        app2FolderMap = new HashMap<>();
        applicationInfoViews = new ArrayList<>();
        folderInfoViews = new ArrayList<>();
        {
            ApplicationInfoView application1 = ApplicationInfoView.builder().applicationId("app001").name("app1").build();
            applicationInfoViews.add(application1);

            FolderInfoView folder1 = FolderInfoView.builder().folderId("folder001").parentFolderId(null).name("folder1").build();
            folderInfoViews.add(folder1);

            FolderInfoView folder2 = FolderInfoView.builder().folderId("folder002").parentFolderId(null).name("folder2").build();
            folderInfoViews.add(folder2);
            {
                ApplicationInfoView application2 = ApplicationInfoView.builder().applicationId("app002").name("app2").build();
                applicationInfoViews.add(application2);
                app2FolderMap.put("app002", "folder002");

                FolderInfoView folder3 = FolderInfoView.builder().folderId("folder003").parentFolderId("folder002").name("folder3").build();
                folderInfoViews.add(folder3);
            }

            FolderInfoView folder4 = FolderInfoView.builder().folderId("folder004").parentFolderId("not exist").name("folder4").build();
            folderInfoViews.add(folder4);
        }
        tree = new Tree<>(folderInfoViews,
                FolderInfoView::getFolderId,
                FolderInfoView::getParentFolderId,
                applicationInfoViews,
                view -> app2FolderMap.get(view.getApplicationId()),
                null);
    }

    @Test
    public void testTreeBuilder() {
        Assert.assertEquals(4, tree.get(null).getAllFolderChildren().size());
        Assert.assertEquals(1, tree.get("folder002").getAllFolderChildren().size());
        Assert.assertEquals("folder003", tree.get("folder002").getAllFolderChildren().get(0).getFolderId());
        Assert.assertEquals(0, tree.get("folder001").getAllFolderChildren().size());
    }

    @Test
    public void testPostOrderIterate() {
        // test post
        tree.postOrderIterate(node -> {
            if (node instanceof Tree<ApplicationInfoView, FolderInfoView>) {
                return;
            }
            if (node instanceof FolderNode<ApplicationInfoView, FolderInfoView> folderNode) {
                folderNode.getSelf().setSubApplications(folderNode.getElementChildren());
                folderNode.getSelf().setSubFolders(folderNode.getFolderChildren());
            }
        });
        Assert.assertEquals(0, folderInfoViews.get(0).getSubFolders().size());
        Assert.assertEquals(0, folderInfoViews.get(0).getSubApplications().size());
        Assert.assertEquals(1, folderInfoViews.get(1).getSubFolders().size());
        Assert.assertEquals(1, folderInfoViews.get(1).getSubApplications().size());
        Assert.assertEquals(0, folderInfoViews.get(2).getSubFolders().size());
        Assert.assertEquals(0, folderInfoViews.get(2).getSubApplications().size());
        Assert.assertEquals(0, folderInfoViews.get(3).getSubFolders().size());
        Assert.assertEquals(0, folderInfoViews.get(3).getSubApplications().size());
    }
}