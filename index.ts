import express, { Request, Response, NextFunction } from "express";

import { userRouter } from "./users/users.js";

const port = 8000;
const app = express();

app.use((req, res, next) => {
	console.log("Time ", Date.now());
	next();
});

app.get("/", (req, res) => {
	res.append("Testing", "api");
	res.type("application/json");
	res.cookie("token", "dfjkhkgd");
	res.json("Hello");
});

app.get("/error", () => {
	throw new Error("Error !!!");
});

app.use("/users", userRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	console.log(error.message);
	res.status(500).send(error.message);
});

app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`);
});
