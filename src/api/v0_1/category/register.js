import sql from "../../../db/pgsql.js";

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export default async function registerCategory(req, res) {
  const obj = { name: req.body.category.name };

  try {
    await sql`INSERT INTO category ${sql(obj, ["name"])}`;
  } catch (e) {
    return res.status(401).send("Category registeration failed");
  }

  return res.status(200).send("Category registeration succeed");
}
