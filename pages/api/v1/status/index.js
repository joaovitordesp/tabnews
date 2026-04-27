import database from "../../../../infra/database";

async function status(req, res) {
  const updateAt = new Date().toISOString();

  res.status(200).json({
    updated_at: updateAt,
  });

  return;
}

export default status;
