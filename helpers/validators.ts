import { Response, Request, NextFunction } from "express";
import JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

const userValidator = (req: Request, res: Response, next: NextFunction) => {
	req.check("email", "Email must be between 3 - 32 characters").isEmail().withMessage("Email is Invalid").isLength({
		min: 4,
		max: 32,
	});
	req.check("password", "Password is required").notEmpty();
	req.check("password")
		.isLength({
			min: 6,
		})
		.withMessage("Password must contain at least 6 characters")
		.matches(/\d/)
		.withMessage("Password Must contain a number");

	const errors = req.validationErrors();
	if (errors) {
		console.error(`errors`, errors);
		const firstError = errors.map((error: any) => error.msg)[0];
		return res.status(400).json({ error: firstError });
	}
	next();
};
const tokenValidator = (req: Request, res: Response, next: NextFunction) => {
	let token = req.header("x-auth-token") || req.headers["authorization"];
	if (token && token.startsWith("Bearer ")) {
		token = token.slice(7, token.length);
	}
	if (token) {
		try {
			const user = JWT.verify(token, JWT_SECRET);
			console.log(user);
			next();
		} catch (error: any) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).json({ error: "Token Expired" });
			}
			if (error.name === "JsonWebTokenError") {
				return res.status(401).json({ error: "Token is not valid" });
			}

			return res.status(500).json({ error: "Server Error" });
		}
	}
	return res.status(401).json({ error: "Token is not provided" });
};
export { userValidator, tokenValidator };
