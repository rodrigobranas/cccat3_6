import DatabaseConnection from "../../../shared/infra/database/DatabaseConnection";
import ItemDAO from "../../application/query/ItemDAO";
import ItemDTO from "../../application/query/ItemDTO";

export default class ItemDAODatabase implements ItemDAO {

	constructor (readonly databaseConnection: DatabaseConnection) {
	}

	async getItems(): Promise<ItemDTO[]> {
		return this.databaseConnection.query("select * from ccca.item", []);
	}

	async save(itemDTO: ItemDTO): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
