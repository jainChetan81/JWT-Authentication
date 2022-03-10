import express from "express";
import { authRouter } from "./routes";
import expressValidator from "express-validator";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(expressValidator());

app.get("/", (req, res) => {
	res.send("Well done chetan1!");
});
app.use("/auth", authRouter);
app.listen(PORT, () => {
	console.log(`The application is listening on port ${PORT}!`);
});
