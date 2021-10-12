import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import DatabaseConnection from "../../database/DatabaseConnection";

export default class OrderRepositoryDatabase implements OrderRepository {

	constructor (readonly databaseConnection: DatabaseConnection) {
	}

	async save(order: Order): Promise<void> {
		// begin
		const [orderData] = await this.databaseConnection.query(`
			insert into 
				ccca.order 
			(
				code, cpf, issue_date, freight, sequence, coupon
			) 
			values 
			(
				$1, $2, $3, $4, $5, $6
			) 
			returning *`, 
			[
				order.getCode(), 
				order.getCpf(), 
				order.issueDate, 
				order.getFreight(), 
				order.sequence, 
				order.getCoupon()
			]
		);
		for (const orderItem of order.getOrderItems()) {
			await this.databaseConnection.query(`
				insert into
					ccca.order_item
				(
					id_order, id_item, price, quantity
				)
				values
				(
					$1, $2, $3, $4
				)
			`, 
				[
					orderData.id, orderItem.idItem, orderItem.price, orderItem.quantity
				]
			)
		}
		// commit
	}
}
