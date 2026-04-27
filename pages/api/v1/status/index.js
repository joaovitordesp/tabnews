import database from "../../../../infra/database";

async function status(req, res) {
  const updateAt = new Date().toISOString();

  const databaseVersion = await database.query("SHOW server_version();");
  const databaseVersionValue = databaseVersion.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;
  console.log(databaseMaxConnectionsValue);
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenResult = await database.query({
    text: "SELECT count(*)::int from pg_stat_activity where datname= $1;",
    values: [databaseName],
  });
  // "SELECT count(*)::int from pg_stat_activity where datname='local_db';",
  const databaseOpenConnectionsValue = databaseOpenResult.rows[0].count;

  res.status(200).json({
    updated_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenConnectionsValue,
      },
    },
  });

  return;
}

export default status;
