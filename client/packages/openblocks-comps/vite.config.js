import config from "openblocks-cli/config/vite.config";
import viteTsconfigPaths from "vite-tsconfig-paths";
export default {
  ...config,
  plugins: [...config.plugins, viteTsconfigPaths()],
  server: {
    open: true,
    port: 9000,
  },
};
