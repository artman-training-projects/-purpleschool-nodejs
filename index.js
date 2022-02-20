import express from "express";

const port = 8000;
const app = express();

app.all("/hello", (req, res, next) => {
	console.log("All");
	next();
});

const cb = (req, res, next) => {
	console.log("Cb");
	next();
};

app.get("/hello", cb, (req, res) => {
	res.send("Hello");
});

app.route("/user")
	.get("/hello", (req, res) => {
		res.send("GET Hello user");
	})
	.post("/hello", (req, res) => {
		res.send("POST Hello user");
	});

app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`);
});
