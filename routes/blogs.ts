import { Response, Request } from "express";
import { Blogs } from "../types";
import { readFileSync, writeFile } from "fs";
import { v4 } from "uuid";
import { tokenValidator } from "../helpers";

const blogsRouter = require("express").Router();
const filepath = "./blogs.json";

blogsRouter.get("/public", async (_req: Request, res: Response) => {
	try {
		const jsonString = readFileSync(filepath, "utf-8");
		const users: Blogs[] = JSON.parse(jsonString);
		return res.status(200).json(users);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Error reading file from disk");
	}
});
blogsRouter.get("/private", tokenValidator, async (_req: Request, res: Response) => {
	try {
		const jsonString = readFileSync(filepath, "utf-8");
		const users: Blogs[] = JSON.parse(jsonString);
		return res.status(200).json(users);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Error reading file from disk");
	}
});

export default blogsRouter;
