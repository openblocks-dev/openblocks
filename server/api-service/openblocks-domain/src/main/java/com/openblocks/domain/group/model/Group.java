package com.openblocks.domain.group.model;

import java.beans.Transient;
import java.util.Comparator;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.openblocks.domain.group.util.SystemGroups;
import com.openblocks.sdk.models.HasIdAndAuditing;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@ToString
@Document
public class Group extends HasIdAndAuditing implements Comparable<Group> {

    private static final Comparator<Group> COMPARATOR = Comparator.comparingLong(group -> {
        if (group.isAllUsersGroup()) {
            return 1;
        }
        if (group.isDevGroup()) {
            return 2;
        }
        if (group.isSyncGroup()) {
            return 3;
        }
        return group.getCreatedAt().toEpochMilli();
    });

    @NotNull
    private String name;

    @Getter
    @NotNull
    private String organizationId;

    @Getter
    private Boolean allUsersGroup;

    private String type;

    private String dynamicRule;

    private String source; // sync group source

    private String rawDepartmentId; // sync group departmentId

    private boolean syncDeleted;

    public String getName(Locale locale) {
        return isSystemGroup() ? SystemGroups.getName(getType(), locale) : name;
    }

    public String getType() {
        return isAllUsersGroup() ? SystemGroups.ALL_USER : type;
    }

    public boolean isAllUsersGroup() {
        return BooleanUtils.isTrue(allUsersGroup) || SystemGroups.ALL_USER.equals(type);
    }

    public boolean isDevGroup() {
        return SystemGroups.DEV.equals(type);
    }

    public boolean isSyncGroup() {
        return StringUtils.isNotBlank(source);
    }

    public String getSource() {
        return source;
    }

    public String getRawDepartmentId() {
        return rawDepartmentId;
    }

    public boolean isSyncDeleted() {
        return syncDeleted;
    }

    @Transient
    @JsonIgnore
    public boolean isSystemGroup() {
        return isAllUsersGroup()
                || isDevGroup();
    }

    @Transient
    @JsonIgnore
    public boolean isNotSystemGroup() {
        return !isSystemGroup();
    }

    @Override
    public int compareTo(@Nonnull Group o) {
        return COMPARATOR.compare(this, o);
    }

    public long getCreateTime() {
        return createdAt != null ? createdAt.toEpochMilli() : 0;
    }

    public String getDynamicRule() {
        return dynamicRule;
    }

    @Transient
    @JsonIgnore
    public boolean isDynamic() {
        return StringUtils.isNotBlank(dynamicRule);
    }
}
