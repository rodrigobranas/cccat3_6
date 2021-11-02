import Coupon from "../../../domain/entity/Coupon";
import Item from "../../../domain/entity/Item";
import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import DatabaseConnection from "../../database/DatabaseConnection";

export default class OrderRepositoryDatabase implements OrderRepository {

	constructor (readonly databaseConnection: DatabaseConnection) {
	}

	async save(order: Order): Promise<void> {
		const [orderData] = await this.databaseConnection.query(`insert into ccca.order (code, cpf, issue_date, freight, sequence, coupon, total) values ($1, $2, $3, $4, $5, $6, $7) returning *`, [order.getCode(), order.getCpf(), order.issueDate, order.getFreight(), order.sequence, order.getCoupon(), order.getTotal()]);
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
	}

	async get(code: string): Promise<Order> {
		const [orderData] = await this.databaseConnection.query("select * from ccca.order where code = $1", [code]);
		const order = new Order(orderData.cpf, orderData.issue_date, orderData.sequence);
		const orderItemsData = await this.databaseConnection.query("select * from ccca.order_item where id_order = $1", [orderData.id]);
		for (const orderItemData of orderItemsData) {
			const [itemData] = await this.databaseConnection.query("select * from ccca.item where id = $1", [orderItemData.id_item]);
			const item = new Item(itemData.id, itemData.category, itemData.description, itemData.price, itemData.width, itemData.height, itemData.length, itemData.weight);
			order.addItem(item, orderItemData.quantity);
		}
		order.setFreight(orderData.freight);
		const [couponData] = await this.databaseConnection.query("select * from ccca.coupon where code = $1", [orderData.coupon]);
		if (couponData) {
			const coupon = new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
			order.addCoupon(coupon);
		}
		return order;
	}

	async update(order: Order): Promise<void> {
		await this.databaseConnection.query("update ccca.order set status = $1 where code = $2", [order.status, order.code]);
	}

	async count () {
		const [data] = await this.databaseConnection.query("select count(*)::int from ccca.order", []);
		return data.count;
	}
}
