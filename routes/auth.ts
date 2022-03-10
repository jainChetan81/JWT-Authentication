import { Response, Request } from "express";
import users from "../db";
import { userSignupValidator } from "../helpers";
import { User } from "../types";

const authRouter = require("express").Router();
authRouter.post("/signup", userSignupValidator, (req: Request, res: Response) => {
	const { email, password } = req.body;
	console.log(email, password);
	const user: User | undefined = users.find((user) => user.email === email);
	if (user) res.status(409).send("User already exists");
	res.send("Well done auth!");
});

export default authRouter;
