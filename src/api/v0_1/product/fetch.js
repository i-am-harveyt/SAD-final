import Express from "express";
import sql from "../../../db/pgsql.js";

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export default async function fetchProduct(req, res) {
  try {
    const result = await sql`
			SELECT
					product.id AS id,
					-- product.create_date AS date,
					model.name AS model,
					category.name AS category,
					registration.shop_id AS shop,
					registration.date AS register
			FROM
					product
			LEFT JOIN
					model ON product.model_id = model.id
			LEFT JOIN
					category ON model.category_id = category.id
			LEFT JOIN
					registration ON product.id = registration.product_id
			ORDER BY date DESC;
		`;
    return res.status(200).json({
      data: {
        products: result,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(401).json({ error: "Fetch Failed" });
  }
}
