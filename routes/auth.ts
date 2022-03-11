import { Response, Request } from "express";
import { userSignupValidator } from "../helpers";
import { User } from "../types";
import bcrypt from "bcrypt";
import { readFile, readFileSync, writeFile } from "fs";
import { v4 } from "uuid";

const authRouter = require("express").Router();
const filepath = "./db.json";
authRouter.post("/signup", userSignupValidator, async (req: Request, res: Response) => {
	const { email, password } = req.body;
	console.log(email, password);
	try {
		const jsonString = readFileSync(filepath, "utf-8"); //define encoding to convert Buffer into string
		const users: User[] = JSON.parse(jsonString); //convert string into JSON object
		const userExists = users.find((user: User) => user.email === email);
		if (userExists) return res.status(400).send("User already exists");
		const user: User = {
			id: v4(),
			email,
			password: await bcrypt.hash(password, 10),
		};
		users.push(user);
		const jsonStringified = JSON.stringify(users);
		writeFile(filepath, jsonStringified, "utf-8", (err) => {
			if (err) return res.status(500).send("Error writing to file");
			return res.status(201).json({ message: "User created successfully", user });
		});
	} catch (error) {
		console.log(error);
		return res.status(409).send("Error reading file from disk");
	}
});

export default authRouter;
