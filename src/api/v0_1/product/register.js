import Express from "express";
import sql from "../../../db/pgsql.js";

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export default async function registerProduct(req, res) {
  try {
    // make sure if the secret in the request body is a valid one
    const [product_id, secret] = Buffer.from(req.body.secret)
      .toString("utf8")
      .split(";");

    // the token itself is right
    if (secret !== process.env.SECRET)
      return res.status(403).json({
        error: "WRONG SECRET TOKEN",
      });

    // The product id is a really exist one
    const result = await sql`SELECT 1 FROM product WHERE id=${product_id}`;
    if (result.length === 0) {
      return res.status(401).json({
        error: "Information Missing",
      });
    }
  } catch (e) {
    return res.status(401).json({
      error: "Information Missing",
    });
  }

  const obj = {
    id: crypto.randomUUID(),
    account: req.body.account,
    secret: secret,
    storeId: req.body.storeId,
  };
  try {
    await sql.begin([
      sql`INSERT INTO registration ${sql(obj, Object.keys(obj))}`,
    ]);
  } catch (e) {
    return res.status(401).json({
      error: "Information Missing",
    });
  }
  return res.status(200).json({ registeration: { id: obj.id } });
}
