import sql from "../../../db/pgsql.js";

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export default async function registerModel(req, res) {
	const obj = {
		name: req.body.model.name,
		category_id: req.body.model.categoryId,
	};

	try {
		await sql`INSERT INTO model ${sql(obj, Object.keys(obj))}`;
	} catch (e) {
		console.error(e);
		return res.status(401).send({ error: "Category registeration failed"});
	}

	return res.status(200).json({
		message: "Category registeration succeed",
	});
}
