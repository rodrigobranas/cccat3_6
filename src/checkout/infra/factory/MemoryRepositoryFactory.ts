import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import ItemRepositoryMemory from "../repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../repository/memory/OrderRepositoryMemory";

export default class MemoryRepositoryFactory implements AbstractRepositoryFactory {

	createItemRepository(): ItemRepository {
		return new ItemRepositoryMemory();
	}
	createCouponRepository(): CouponRepository {
		throw new Error("Method not implemented.");
	}
	createOrderRepository(): OrderRepository {
		return new OrderRepositoryMemory();
	}
}
