import DatabaseConnection from "../../../shared/infra/database/DatabaseConnection";
import GetItems from "../../application/query/GetItems";
import ItemDAODatabase from "../dao/ItemDAODatabase";

export default class ItemsController {

	constructor (readonly databaseConnection: DatabaseConnection) {
	}

	getItems (params: any, body: any) {
		const getItems = new GetItems(new ItemDAODatabase(this.databaseConnection));
		return getItems.execute();
	}
}
