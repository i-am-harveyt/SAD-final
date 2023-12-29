import sql from "../../../db/pgsql.js";
import Express from "express";
/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export default async function getCategories(req, res) {
  try {
    const result = await sql`SELECT id, name FROM category;`;
    return res.status(200).json({
      data: {
        categories: result,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(401).json({
      error: "Fetch Categories failed",
    });
  }
}
