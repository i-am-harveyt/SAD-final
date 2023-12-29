import sql from "../../../db/pgsql.js";
import Express from "express";
/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export default async function getModel(req, res) {
  try {
    const result = await sql`SELECT id, category_id, name FROM model;`;
    return res.status(200).json({
      model: {
        data: result,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(401).json({
      error: "Fetch Model failed",
    });
  }
}
