import Express from "express";
import sql from "../../../db/pgsql";
/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export default async function addMachine(req, res) {
  const obj = {
    shop_id: req.body.shop_id,
  };
  try {
    const machineID = crypto.randomUUID();
    await sql`INSERT INTO machine ${sql(obj, Object.keys(obj))}`;
    return res.status(200).json({
      machine: {
        id: machineID,
      },
    });
  } catch (e) {
    return res.status(403).json({
      error: "Add Machine failed",
    });
  }
}
