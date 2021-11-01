import GetOrderOutput from "../dto/GetOrderOutput";
import OrderDAO from "./OrderDAO";

export default class GetOrder {

	constructor (readonly orderDAO: OrderDAO) {
	}

	// query, table centric, data centric
	async execute (code: string): Promise<GetOrderOutput> {
		const orderData = await this.orderDAO.getOrder(code);
		const orderItemsData = await this.orderDAO.getOrderItems(orderData.id);
		const getOrderOutput = new GetOrderOutput(orderData.code, orderData.cpf, orderItemsData, orderData.freight, orderData.total);
		return getOrderOutput;
	}
}
