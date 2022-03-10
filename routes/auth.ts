import { Response, Request } from "express";
import users from "../db";
import { userSignupValidator } from "../helpers";
import { User } from "../types";
import bcrypt from "bcrypt";

const authRouter = require("express").Router();
authRouter.post("/signup", userSignupValidator, async (req: Request, res: Response) => {
	const { email, password } = req.body;
	console.log(email, password);
	const user: User | undefined = users.find((user) => user.email === email);
	if (user) return res.status(409).send("User already exists");
	let hashedPassword = await bcrypt.hash(password, 10);
	console.log(hashedPassword);
	res.send("Well done auth!");
});

export default authRouter;
