import DatabaseConnectionAdapter from "../../src/checkout/infra/database/DatabaseConnectionAdapter";
import ItemRepositoryDatabase from "../../src/checkout/infra/repository/database/ItemRepositoryDatabase";
import PlaceOrder from "../../src/checkout/application/usecase/PlaceOrder";
import PlaceOrderInput from "../../src/checkout/application/dto/PlaceOrderInput";
import OrderRepositoryDatabase from "../../src/checkout/infra/repository/database/OrderRepositoryDatabase";
import CouponRepositoryDatabase from "../../src/checkout/infra/repository/database/CouponRepositoryDatabase";
import GetOrders from "../../src/checkout/application/query/GetOrders";
import OrderDAODatabase from "../../src/checkout/infra/dao/OrderDAODatabase";
import DatabaseRepositoryFactory from "../../src/checkout/infra/factory/DatabaseRepositoryFactory";

let placeOrder: PlaceOrder;
let getOrders: GetOrders;

beforeEach(function () {
	const databaseConnection = new DatabaseConnectionAdapter();
	placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(databaseConnection));
	const orderDAO = new OrderDAODatabase(databaseConnection);
	getOrders = new GetOrders(orderDAO);
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
	await placeOrder.execute(input);
	const getOrdersOutput = await getOrders.execute();
});
