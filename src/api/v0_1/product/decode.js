import Express from "express";

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export default async function decodeSecret(req, res) {
	let secret = "";
	try {
		secret = JSON.parse(decodeURIComponent(req.query.secret));
	} catch (e) {
		return res.status(403).json({ error: "Secret is Missing" });
	}
	const [productID, key] = atob(secret.data.product.secret).split(";");

	// check if the secret is right
	if (key !== process.env.SECRET)
		return res.status(403).json({ error: "The secret is incorrect" });
	else if (productID != secret.data.product.id)
		return res.status(403).json({ error: "The productId is incorrect" });

	// add machine info into the data
	let data = {
		// a test data, the information can be retrieved from db or somewhere
		product: secret.data.product,
		model: {
			// test data
			id: "c77e3276-81cf-480e-8c48-2c3c25637026",
			name: "Black Jacket",
		},
		shop: {
			// test data
			id: "e294258f-d7d9-4e79-9625-2f7846ed0b6f",
		},
		machine: {
			// test data
			id: "323930da-f3e5-4101-8c44-46ee874e8ae2",
		},
	};

	// redirect to the website and generate the qrcode for registeration
	const url = `http://${
		process.env.FRONT_HOST
	}/decode.html?data=${encodeURIComponent(JSON.stringify(data))}`;
	console.log(url);
	return res.redirect(url);
}
