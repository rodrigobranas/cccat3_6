import OrderDTO from "./OrderDTO";
import OrderItemDTO from "./OrderItemDTO";

export default interface OrderDAO {

	getOrders(): Promise<OrderDTO[]>;
	getOrder(code: string): Promise<OrderDTO>;
	getOrderItems(idOrder: number): Promise<OrderItemDTO[]>;
}
