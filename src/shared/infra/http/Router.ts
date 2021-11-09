import GetItems from "../../../catalog/application/query/GetItems";
import ItemsController from "../../../catalog/infra/controller/ItemsController";
import ItemDAODatabase from "../../../catalog/infra/dao/ItemDAODatabase";
import GetOrders from "../../../checkout/application/query/GetOrders";
import OrdersController from "../../../checkout/infra/controller/OrdersController";
import GetOrdersController from "../../../checkout/infra/controller/OrdersController";
import OrderDAODatabase from "../../../checkout/infra/dao/OrderDAODatabase";
import DatabaseConnection from "../database/DatabaseConnection";
import EventBus from "../event/EventBus";
import Http from "./Http";

export default class Router {

	constructor (readonly http: Http, readonly databaseConnection: DatabaseConnection, readonly eventBus: EventBus) {
		this.configure();
	}

	configure () {
		
		this.http.on("/orders", "get", async (params: any, body: any) => {
			const ordersController = new OrdersController(this.databaseConnection, this.eventBus);
			return ordersController.getOrders(params, body);
		});

		this.http.on("/orders", "post", async (params: any, body: any) => {
			const ordersController = new OrdersController(this.databaseConnection, this.eventBus);
			const order = await ordersController.placeOrder(params, body);
			return order;
		});

		this.http.on("/items", "get", async (params: any, body: any) => {
			const itemsController = new ItemsController(this.databaseConnection);
			return itemsController.getItems(params, body);
		});
	}
}
