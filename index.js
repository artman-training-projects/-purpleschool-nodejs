import express from "express";

import { userRouter } from "./users/users.js";

const port = 8000;
const app = express();

app.get("/", (req, res) => {
	res.append("Testing", "api");
	res.type("application/json");
	res.cookie("token", "dfjkhkgd");
	res.json("Hello");
});

app.use("/users", userRouter);

app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`);
});
