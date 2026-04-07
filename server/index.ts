import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { createServer } from "http";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "5000", 10);
const nextApp = next({ dev, dir: "." });
const handle = nextApp.getRequestHandler();
const upgrade = nextApp.getUpgradeHandler();

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("public/uploads"));

app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (process.env.NODE_ENV === "production") {
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
  }
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "geolocation=(self), microphone=(), camera=()");
  if (_req.path.startsWith("/api/") || _req.path.startsWith("/api?")) {
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
  }
  next();
});

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    }
  });

  next();
});

(async () => {
  await nextApp.prepare();
  log("Next.js ready", "next");

  await registerRoutes(httpServer, app);

  const { seedDatabase, seedPages, seedSections, seedDealers, seedTestimonials } = await import("./seed");
  const { seedFaqs } = await import("./seed-faqs");
  const { seedPromotions } = await import("./seed-promotions");
  const { seedServices, seedMaintenancePlans } = await import("./seed-services");
  const { seedEditorialContent } = await import("./seed-editorial");
  await seedDatabase();
  await seedPages();
  await seedSections();
  await seedDealers();
  await seedFaqs();
  await seedTestimonials();
  await seedPromotions();
  await seedServices();
  await seedMaintenancePlans();
  await seedEditorialContent();

  const { initScheduler } = await import("./growth-scheduler");
  await initScheduler();

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Internal Server Error:", err);

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message });
  });

  app.get("/taller-electricos-:ciudad", (req: Request, res: Response) => {
    const { ciudad } = req.params;
    req.url = `/talleres/${ciudad}`;
    return handle(req, res);
  });

  app.get("/talleres/:ciudad", (req: Request, res: Response) => {
    const { ciudad } = req.params;
    return res.redirect(301, `/taller-electricos-${ciudad}`);
  });

  app.all("/{*path}", (req: Request, res: Response) => {
    return handle(req, res);
  });

  httpServer.on("upgrade", (req, socket, head) => {
    upgrade(req, socket, head);
  });

  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
