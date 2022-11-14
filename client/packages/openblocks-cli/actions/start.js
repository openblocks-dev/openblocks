import { createServer } from "vite";
import viteConfig from "../config/vite.config.js";

export default async function startDevServerAction(options) {
  const server = await createServer({
    ...viteConfig,
    server: {
      open: true,
      port: options.port,
      host: options.host,
    },
  });
  console.green(`Starting...`);
  return server.listen();
}
