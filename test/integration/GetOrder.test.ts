import DatabaseConnectionAdapter from "../../src/infra/database/DatabaseConnectionAdapter";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import PlaceOrder from "../../src/application/usecase/PlaceOrder";
import PlaceOrderInput from "../../src/application/dto/PlaceOrderInput";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import GetOrder from "../../src/application/query/GetOrder";
import OrderDAODatabase from "../../src/infra/dao/OrderDAODatabase";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";

let placeOrder: PlaceOrder;
let getOrder: GetOrder;

beforeEach(function () {
	const databaseConnection = new DatabaseConnectionAdapter();
	placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(databaseConnection));
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
