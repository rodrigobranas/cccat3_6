import DatabaseConnection from "../../../../shared/infra/database/DatabaseConnection";
import StockEntry from "../../../domain/entity/StockEntry";
import StockRepository from "../../../domain/repository/StockRepository";

export default class StockRepositoryDatabase implements StockRepository {

	constructor (readonly databaseConnection: DatabaseConnection) {
	}

	async save(stockEntry: StockEntry): Promise<void> {
		this.databaseConnection.query("insert into ccca.stock_entry (id_item, operation, quantity, date) values ($1, $2, $3, $4)", [stockEntry.idItem, stockEntry.operation, stockEntry.quantity, new Date()]);
	}

}