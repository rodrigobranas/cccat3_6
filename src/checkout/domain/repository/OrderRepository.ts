import Order from "../entity/Order";

export default interface OrderRepository {
    save(order: Order): Promise<void>;
	count(): Promise<number>;
	get(code: string): Promise<Order>;
	update(order: Order): Promise<void>;
}
