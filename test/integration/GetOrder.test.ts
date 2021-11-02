import DatabaseConnectionAdapter from "../../src/checkout/infra/database/DatabaseConnectionAdapter";
import ItemRepositoryDatabase from "../../src/checkout/infra/repository/database/ItemRepositoryDatabase";
import PlaceOrder from "../../src/checkout/application/usecase/PlaceOrder";
import PlaceOrderInput from "../../src/checkout/application/dto/PlaceOrderInput";
import OrderRepositoryDatabase from "../../src/checkout/infra/repository/database/OrderRepositoryDatabase";
import CouponRepositoryDatabase from "../../src/checkout/infra/repository/database/CouponRepositoryDatabase";
import GetOrder from "../../src/checkout/application/query/GetOrder";
import OrderDAODatabase from "../../src/checkout/infra/dao/OrderDAODatabase";
import DatabaseRepositoryFactory from "../../src/checkout/infra/factory/DatabaseRepositoryFactory";
import EventBus from "../../src/shared/infra/event/EventBus";

let placeOrder: PlaceOrder;
let getOrder: GetOrder;

beforeEach(function () {
	const databaseConnection = new DatabaseConnectionAdapter();
	const databaseRepositoryFactory = new DatabaseRepositoryFactory(databaseConnection);
	const eventBus = new EventBus();
	placeOrder = new PlaceOrder(databaseRepositoryFactory, eventBus);
	const orderDAO = new OrderDAODatabase(databaseConnection);
	getOrder = new GetOrder(orderDAO);
});

test("Deve obter um pedido pelo código", async function () {
	const input = new PlaceOrderInput(
		"847.903.332-05", 
		[
			{
				idItem: 1,
				quantity: 1
			},
			{
				idItem: 2,
				quantity: 1
			},
			{
				idItem: 3,
				quantity: 3
			}
		], 
		new Date("2021-03-01"), 
		"VALE20"
	);
	const placeOrderOutput = await placeOrder.execute(input);
	const getOrderOutput = await getOrder.execute(placeOrderOutput.code);
	expect(getOrderOutput.total).toBe(4872);
});
