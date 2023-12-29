import Express from "express";
import sql from "../../../db/pgsql.js";
/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export default async function checkIP(req, res, next) {
	const clientIP = req.headers["x-forwarded-for"];
	try {
		const checkIpResult = await sql`
			SELECT * from machine
			WHERE ip=${clientIP};
		`;
		if (checkIpResult.length < 1)
			return res.status(403).json({
				error: "You're IP is not authorized",
			});
		req.machineIP = checkIpResult[0].ip;
	} catch (e) {
		return res.status(403).json({
			error: "You're IP is not authorized",
		});
	}
	next();
}
