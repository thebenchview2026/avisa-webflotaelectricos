/**
 * AVISA WebFlotaElectricos — Migración a Supabase
 * Lee datos de Replit PostgreSQL → inserta en Supabase via REST API
 * Uso: node scripts/migrate_to_supabase.js
 */

import { createClient } from "@supabase/supabase-js";
import pg from "pg";

const { Pool } = pg;

const SUPABASE_URL = "https://uqkmjxdeeckavfteycmd.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SOURCE_DB_URL = process.env.DATABASE_URL;

if (!SUPABASE_SERVICE_KEY) {
  console.error("ERROR: Falta SUPABASE_SERVICE_ROLE_KEY en el entorno");
  process.exit(1);
}
if (!SOURCE_DB_URL) {
  console.error("ERROR: Falta DATABASE_URL en el entorno");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});

const sourcePool = new Pool({ connectionString: SOURCE_DB_URL });

async function readTable(tableName) {
  const res = await sourcePool.query(`SELECT * FROM public.${tableName}`);
  return res.rows;
}

async function upsertTable(tableName, rows) {
  if (rows.length === 0) {
    console.log(`  ⏭  sin datos`);
    return 0;
  }

  const chunkSize = 50;
  let total = 0;

  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const { error } = await supabase
      .from(tableName)
      .upsert(chunk, { onConflict: "id", ignoreDuplicates: false });

    if (error) {
      throw new Error(`Chunk ${Math.floor(i / chunkSize) + 1}: ${error.message}`);
    }
    total += chunk.length;
  }

  return total;
}

async function migrate() {
  console.log("🚀 Iniciando migración Replit → Supabase\n");

  const tables = [
    "brands",
    "dealers",
    "vehicles",
    "faq_categories",
    "faqs",
    "pages",
    "sections",
    "promotions",
    "editorial_content",
    "seo_metadata",
    "topic_clusters",
    "site_settings",
    "services",
    "testimonials",
    "maintenance_plans",
    "users",
  ];

  for (const tableName of tables) {
    process.stdout.write(`📋 ${tableName}... `);
    try {
      const rows = await readTable(tableName);
      process.stdout.write(`${rows.length} filas → `);
      const inserted = await upsertTable(tableName, rows);
      console.log(`✅ ${inserted} migradas`);
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
    }
  }

  console.log("\n📊 Verificación en Supabase:");
  for (const t of ["brands", "vehicles", "faqs", "sections", "promotions", "editorial_content"]) {
    const { count, error } = await supabase
      .from(t)
      .select("*", { count: "exact", head: true });
    console.log(`  ${t}: ${error ? "❌ " + error.message : count + " filas"}`);
  }

  await sourcePool.end();
  console.log("\n✅ Migración completada");
}

migrate().catch((err) => {
  console.error("💥 Error fatal:", err.message);
  process.exit(1);
});
