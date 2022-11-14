package com.openblocks.domain.permission.model;

public class UserPermissionOnResourceStatus {
    private final ResourcePermission permission;

    private final FailReason failReason;

    private UserPermissionOnResourceStatus(ResourcePermission permission, FailReason failReason) {
        this.failReason = failReason;
        this.permission = permission;
    }

    public static UserPermissionOnResourceStatus success(ResourcePermission permission) {
        return new UserPermissionOnResourceStatus(permission, null);
    }

    public static UserPermissionOnResourceStatus fail(FailReason failReason) {
        return new UserPermissionOnResourceStatus(null, failReason);
    }

    public static UserPermissionOnResourceStatus notInOrg() {
        return new UserPermissionOnResourceStatus(null, FailReason.NOT_IN_ORG);
    }

    public static UserPermissionOnResourceStatus anonymousUser() {
        return new UserPermissionOnResourceStatus(null, FailReason.ANONYMOUS_USER);
    }

    public static UserPermissionOnResourceStatus notEnoughPermission() {
        return new UserPermissionOnResourceStatus(null, FailReason.NOT_ENOUGH_PERMISSION);
    }

    public boolean hasPermission() {
        return permission != null;
    }

    public ResourcePermission getPermission() {
        return permission;
    }

    public boolean failByNotInOrg() {
        return failReason == FailReason.NOT_IN_ORG;
    }

    public boolean failByNotEnoughPermission() {
        return failReason == FailReason.NOT_ENOUGH_PERMISSION;
    }

    public boolean failByAnonymousUser() {
        return failReason == FailReason.ANONYMOUS_USER;
    }

    enum FailReason {
        ANONYMOUS_USER,
        NOT_IN_ORG,
        NOT_ENOUGH_PERMISSION
    }
}