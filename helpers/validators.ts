import { Response, Request, NextFunction } from "express";

const userSignupValidator = (req: Request, res: Response, next: NextFunction) => {
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
export { userSignupValidator };
