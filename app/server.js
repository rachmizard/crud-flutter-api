/* eslint-disable no-undef */
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

import rootRouter from "./router";

import { initializeDB } from "./utils/database";

const app = express();

app.use(cors());

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.use("/api", rootRouter);

app.use(function (_, res) {
	res.status(404).json({
		message: "URL Not Found",
	});
});

export default app;
