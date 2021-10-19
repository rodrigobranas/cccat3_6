import CouponRepository from "../repository/CouponRepository";
import ItemRepository from "../repository/ItemRepository";
import OrderRepository from "../repository/OrderRepository";

export default interface AbstractRepositoryFactory {
	createItemRepository(): ItemRepository;
	createCouponRepository(): CouponRepository;
	createOrderRepository(): OrderRepository;
}
