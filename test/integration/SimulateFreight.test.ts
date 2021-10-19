import SimulateFreightInput from "../../src/application/dto/SimulateFreightInput";
import SimulateFreight from "../../src/application/usecase/SimulateFreight";
import DatabaseConnectionAdapter from "../../src/infra/database/DatabaseConnectionAdapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";

test("Deve simular o frete dos produtos", async function () {
	const databaseConnection = new DatabaseConnectionAdapter()
	const simulateFreight = new SimulateFreight(new DatabaseRepositoryFactory(databaseConnection));
	const input = new SimulateFreightInput([
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
	]);
	const freight = await simulateFreight.execute(input);
	expect(freight).toBe(280);
});
