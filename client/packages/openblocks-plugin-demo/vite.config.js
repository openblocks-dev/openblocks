import config from "openblocks-cli/config/vite.config";
export default {
  ...config,
  server: {
    open: true,
    port: 9000,
  },
};
