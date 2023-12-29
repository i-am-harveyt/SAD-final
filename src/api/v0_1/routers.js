import { Router } from "express";
import asyncFunc from "./util/asyncFunc.util.js";
import getCategories from "./category/get.js";
import registerCategory from "./category/register.js";
import registerModel from "./model/register.js";
import createProduct from "./product/create.js";
import getSecret from "./product/getSecret.js";
import checkIP from "./authentication/checkIP.js";
import registerProduct from "./product/register.js";
import getModels from "./model/get.js";
import decodeSecret from "./product/decode.js";
import fetchProduct from "./product/fetch.js";

const api = Router();
api.get("/", (_req, res) => res.json({ message: "Hello API" }));

/* category */
api.get("/category/get", asyncFunc(getCategories));
api.post("/category/register", asyncFunc(registerCategory));

/* model */
api.get("/model/get", asyncFunc(getModels));
api.post("/model/register", asyncFunc(registerModel));

/* product */
api.post(
  "/product/create",
  // asyncFunc(checkIP),
  asyncFunc(createProduct),
  asyncFunc(getSecret),
);
api.get(
  "/product/fetch",
  // asyncFunc(checkIP),
  asyncFunc(fetchProduct),
);
api.get(
  "/product/decode",
  // asyncFunc(checkIP),
  asyncFunc(decodeSecret),
);
api.post("/register", asyncFunc(registerProduct));

export default api;
