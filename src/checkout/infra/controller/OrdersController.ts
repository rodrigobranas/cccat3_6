import DatabaseConnection from "../../../shared/infra/database/DatabaseConnection";
import EventBus from "../../../shared/infra/event/EventBus";
import GetOrders from "../../application/query/GetOrders";
import PlaceOrder from "../../application/usecase/PlaceOrder";
import OrderDAODatabase from "../dao/OrderDAODatabase";
import DatabaseRepositoryFactory from "../factory/DatabaseRepositoryFactory";

export default class OrdersController {

	constructor (readonly databaseConnection: DatabaseConnection, readonly eventBus: EventBus) {
	}
	
	getOrders (params: any, body: any) {
		const getOrders = new GetOrders(new OrderDAODatabase(this.databaseConnection));
		return getOrders.execute();
	}

	async placeOrder (params: any, body: any) {
		const placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(this.databaseConnection), this.eventBus);
		const order = await placeOrder.execute(body);
		return order;
	}
}
