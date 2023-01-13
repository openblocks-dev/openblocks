package com.openblocks.api.application.view;

import java.time.Instant;

import javax.annotation.Nullable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.openblocks.api.home.FolderInfoView;
import com.openblocks.domain.application.model.ApplicationStatus;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ApplicationInfoView {
    private final String orgId;
    private final String applicationId;
    private final String name;
    private final long createAt;
    private final String createBy;
    private final String role; // user's max role for current app
    /**
     * @see com.openblocks.domain.application.model.ApplicationType
     */
    private final int applicationType;
    private final ApplicationStatus applicationStatus;
    @JsonInclude(Include.NON_NULL)
    private final Object containerSize; // for module size
    @Nullable
    private final String folderId;

    @Nullable
    private final Instant lastViewTime; // user last visit time for this app
    private final Instant lastModifyTime; // app's last update time

    private final boolean publicToAll;

    public long getLastViewTime() {
        return lastViewTime == null ? 0 : lastViewTime.toEpochMilli();
    }

    public long getLastModifyTime() {
        return lastModifyTime == null ? 0 : lastModifyTime.toEpochMilli();
    }

    /**
     * used by front end.
     *
     * @see FolderInfoView#isFolder()
     */
    public boolean isFolder() {
        return false;
    }
}
