import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function apiMiddlewarePlugin() {
  return {
    name: "api-server-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith("/api/send-email") && req.method === "POST") {
          try {
            const chunks = [];
            req.on("data", (chunk) => {
              chunks.push(chunk);
            });

            req.on("end", async () => {
              const rawBody = Buffer.concat(chunks).toString("utf-8");
              try {
                req.body = rawBody ? JSON.parse(rawBody) : {};
              } catch (parseErr) {
                console.error("Vite API body parse error:", parseErr, "rawBody:", rawBody);
                req.body = {};
              }

              // Load environment variables into process.env
              const env = loadEnv("", process.cwd(), "");
              Object.assign(process.env, env);

              const { default: handler } = await import("./api/send-email.js");

              // Adapt response methods for Vercel/Express-like handler
              res.status = (code) => {
                res.statusCode = code;
                return res;
              };
              res.json = (data) => {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));
                return res;
              };

              await handler(req, res);
            });
          } catch (err) {
            console.error("Vite API middleware error:", err);
            next(err);
          }
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiMiddlewarePlugin()],
});
