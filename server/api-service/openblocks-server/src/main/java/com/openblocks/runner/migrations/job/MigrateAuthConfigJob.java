package com.openblocks.runner.migrations.job;

public interface MigrateAuthConfigJob {

    /**
     * For enterprise mode, auth configs located in the yaml file will be migrated to the mongodb except the oauth2.0, and then those in the yaml
     * file will be deprecated, and instead in the mongodb will be effective.
     * <p>
     * For the more complex oauth 2.0 config, it will be still effective in the yaml file until also being migrated to the mongodb in the future.
     */
    void migrateAuthConfig();
}
