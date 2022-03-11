export interface User {
	id: string;
	name?: string;
	email: string;
	password: string;
}
export interface Blogs {
	id: string;
	userId: string;
	description?: string;
	title: string;
}
