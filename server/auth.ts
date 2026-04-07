import type { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import bcrypt from "bcryptjs";
import pg from "pg";
import { storage } from "./storage";

const PgSession = connectPgSimple(session);

const sessionPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

declare module "express-session" {
  interface SessionData {
    userId: string;
    username: string;
    role: string;
  }
}

export function setupAuth(app: Express) {
  app.use(
    session({
      store: new PgSession({
        pool: sessionPool,
        tableName: "session",
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
    })
  );

  app.post("/api/admin/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Usuario y contraseña son obligatorios" });
    }

    const user = await storage.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    if (user.active === false) {
      return res.status(403).json({ message: "Cuenta desactivada" });
    }

    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ message: "Error de sesión" });
      }

      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.role = user.role || "admin";

      req.session.save(async () => {
        await storage.logActivity({
          userId: user.id,
          action: "login",
          entity: "user",
          entityId: user.id,
          details: `${user.username} inició sesión`,
        });

        return res.json({
          id: user.id,
          username: user.username,
          role: user.role,
          displayName: user.displayName,
          email: user.email,
        });
      });
    });
  });

  app.post("/api/admin/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }
      res.clearCookie("connect.sid");
      return res.json({ message: "Sesión cerrada" });
    });
  });

  app.get("/api/admin/me", async (req: Request, res: Response) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    return res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      displayName: user.displayName,
      email: user.email,
    });
  });
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "No autenticado" });
  }
  next();
}

export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "No autenticado" });
    }
    if (!roles.includes(req.session.role || "")) {
      return res.status(403).json({ message: "No tiene permisos suficientes" });
    }
    next();
  };
}

export async function seedAdminUser() {
  const existing = await storage.getUserByUsername("admin");
  if (!existing) {
    const hashed = await bcrypt.hash("admin123", 10);
    await storage.createUser({
      username: "admin",
      password: hashed,
      role: "superadmin",
      displayName: "Administrador",
      email: "admin@grupoavisa.com",
      active: true,
    });
    console.log("Admin user created: admin / admin123");
  }
}
