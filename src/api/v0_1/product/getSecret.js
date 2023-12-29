import Express from "express";

/**
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
export default async function getSecret(req, res) {
  const secretKey = process.env.SECRET;
  return res.status(200).json({
    data: {
      product: {
        id: req.productId,
        // to simplify
				// I use change the encoding
				// and skip manufacturer info part
				// But the logic is same
        secret: Buffer.from(`${req.productId};${secretKey}`).toString("base64"),
      },
    },
  });
}
