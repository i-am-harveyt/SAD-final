import express from "express";
import api from "./api/v0_1/routers.js";
import { config } from "dotenv";
import cors from "cors";

config();
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/v0.1", api);

app.listen(PORT, () => console.log(`Express app listening on port${PORT}`));
