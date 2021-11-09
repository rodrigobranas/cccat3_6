import Http from "./Http";
import express from "express";

export default class ExpressAdapter implements Http {
	private app: any;

	constructor () {
		this.app = express();
		this.app.all("*", function (req: any, res: any, next: any) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
			res.header("Access-Control-Allow-Headers", "Content-Type, x-access-token");
			next();
		});
		this.app.use(express.json());
	}

	on(url: string, method: string, fn: any): void {
		this.app[method](url, async function (req: any, res: any) {
			const result = await fn(req.params, req.body);
			res.json(result);
		});
	}

	listen(port: number): void {
		this.app.listen(port);
	}
}
