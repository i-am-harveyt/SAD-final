import sql from "../../../db/pgsql.js";
import Express from "express";

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export default async function createProduct(req, res, next) {
  const obj = {
    model_id: req.body.model.id,
  };
  try {
    const result = await sql`
			INSERT INTO product 
      ${sql(obj, Object.keys(obj))} 
      RETURNING id;
			`;
    req.productId = result[0].id;
  } catch (e) {
    console.error(e);
    return res.status(403).json({ error: "Create Failed" });
  }
  next();
}
