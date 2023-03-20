package com.openblocks.infra.constant;

public final class NewUrl {

    private NewUrl() {
    }

    public static final String PREFIX = "/api";
    public static final String ORGANIZATION_URL = PREFIX + "/organizations";
    public static final String DATASOURCE_URL = PREFIX + "/datasources";
    public static final String USER_URL = PREFIX + "/users";
    public static final String CONFIG_URL = PREFIX + "/configs";
    public static final String GROUP_URL = PREFIX + "/groups";
    public static final String ASSET_URL = PREFIX + "/assets";

    public static final String CUSTOM_AUTH = PREFIX + "/auth";
    public static final String INVITATION_URL = PREFIX + "/invitation";
    public static final String APPLICATION_URL = PREFIX + "/applications";

    public static final String APPLICATION_HISTORY_URL = PREFIX + "/application/history-snapshots";
    public static final String QUERY_URL = PREFIX + "/query";
    public static final String STATE_URL = PREFIX + "/state";
    public static final String AUDIT_LOG_URL = PREFIX + "/audit-logs";
    public static final String LIBRARY_QUERY_URL = PREFIX + "/library-queries";
    public static final String LIBRARY_QUERY_RECORD_URL = PREFIX + "/library-query-records";

    public static final String FOLDER_URL = PREFIX + "/folders";

    public static final String GITHUB_STAR = PREFIX + "/misc/github-star";
    public static final String JS_LIBRARY = PREFIX + "/misc/js-library";
    public static final String MATERIAL_URL = PREFIX + "/materials";
    public static final String CONTACT_SYNC = PREFIX + "/sync";
}
