import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import DatabaseConnection from "../database/DatabaseConnection";
import CouponRepositoryDatabase from "../repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../repository/database/OrderRepositoryDatabase";

export default class DatabaseRepositoryFactory implements AbstractRepositoryFactory {

	constructor (readonly databaseConnection: DatabaseConnection) {
	}

	createItemRepository(): ItemRepository {
		return new ItemRepositoryDatabase(this.databaseConnection);
	}
	createCouponRepository(): CouponRepository {
		return new CouponRepositoryDatabase(this.databaseConnection);
	}
	createOrderRepository(): OrderRepository {
		return new OrderRepositoryDatabase(this.databaseConnection);
	}
}
