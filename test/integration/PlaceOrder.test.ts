import DatabaseConnectionAdapter from "../../src/infra/database/DatabaseConnectionAdapter";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";
import PlaceOrder from "../../src/application/usecase/PlaceOrder";

test("Deve fazer um pedido", async function () {
    const input = {
        cpf: "847.903.332-05",
        orderItems: [
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
        ]
    };
    const placeOrder = new PlaceOrder(new ItemRepositoryMemory(), new OrderRepositoryMemory());
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(6090);
});
