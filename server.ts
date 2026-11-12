import express from "express";
import path from "path";
import net from "net";
import { createServer as createViteServer } from "vite";
import app from "./server/app";

function getRequestedPort(): number {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "-p" || arg === "--port") {
      const val = parseInt(args[i + 1], 10);
      if (!isNaN(val) && val > 0 && val < 65536) return val;
    } else if (arg.startsWith("-p=")) {
      const val = parseInt(arg.slice(3), 10);
      if (!isNaN(val) && val > 0 && val < 65536) return val;
    } else if (arg.startsWith("--port=")) {
      const val = parseInt(arg.slice(7), 10);
      if (!isNaN(val) && val > 0 && val < 65536) return val;
    }
  }
  if (process.env.PORT) {
    const envPort = parseInt(process.env.PORT, 10);
    if (!isNaN(envPort) && envPort > 0 && envPort < 65536) return envPort;
  }
  return 3000;
}

function checkPortAvailable(port: number, host = "0.0.0.0"): Promise<boolean> {
  return new Promise((resolve) => {
    const tester = net.createServer()
      .once("error", () => resolve(false))
      .once("listening", () => {
        tester.once("close", () => resolve(true)).close();
      })
      .listen(port, host);
  });
}

async function resolveAvailablePort(preferredPort: number, maxAttempts = 30): Promise<number> {
  let port = preferredPort;
  for (let i = 0; i < maxAttempts; i++) {
    const available = await checkPortAvailable(port);
    if (available) {
      if (port !== preferredPort) {
        console.warn(`[Server] Port ${preferredPort} is in use. Automatically switched to port ${port}.`);
      }
      return port;
    }
    port++;
  }
  return preferredPort;
}

// Vite middleware & start server
async function start() {
  const requestedPort = getRequestedPort();
  const PORT = await resolveAvailablePort(requestedPort);

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`E-Modul Informatika Server running on http://localhost:${PORT}`);
  });

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.error(`[Server] Port ${PORT} is already in use.`);
    } else {
      console.error("[Server] Error:", err);
    }
  });
}

start();
