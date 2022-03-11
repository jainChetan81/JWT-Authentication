import { Response, Request } from "express";
import { userValidator } from "../helpers";
import { User } from "../types";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { readFileSync, writeFile } from "fs";
import { v4 } from "uuid";

const authRouter = require("express").Router();
const filepath = "./db.json";
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret"; //in case secret is not set in env

authRouter.post("/signup", userValidator, async (req: Request, res: Response) => {
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
		const token = JWT.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
		const jsonStringified = JSON.stringify(users);
		writeFile(filepath, jsonStringified, "utf-8", (err) => {
			if (err) return res.status(500).send("Error writing to file");
			return res.status(201).json({ message: "User created successfully", user, token });
		});
	} catch (error) {
		console.error(error);
		return res.status(409).send("Error reading file from disk");
	}
});
authRouter.post("/signin", userValidator, async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const jsonString = readFileSync(filepath, "utf-8");
		const users: User[] = JSON.parse(jsonString);
		const user = users.find((user: User) => user.email === email);
		if (!user) return res.status(400).json({ message: "User does not exist" });
		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) return res.status(400).json({ message: "Invalid password" });
		const token = JWT.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
		return res
			.status(200)
			.json({ message: "User signed in successfully", user: { id: user.id, email: user.email }, token });
	} catch (error) {
		console.error(error);
		return res.status(500).send("Error reading file from disk");
	}
});
authRouter.get("/users", async (_req: Request, res: Response) => {
	try {
		const jsonString = readFileSync(filepath, "utf-8");
		const users: User[] = JSON.parse(jsonString);
		return res.status(200).json(users);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Error reading file from disk");
	}
});

export default authRouter;
