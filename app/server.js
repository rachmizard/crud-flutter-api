import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

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

(async () => {
	await initializeDB();

	app.listen("4000", () => {
		console.log("Listening on 4000 PORT");
	});
})();
