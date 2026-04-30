import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

async function migrations(req, res) {
  const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  });

  return res.status(200).json(migrations);
}

export default migrations;
