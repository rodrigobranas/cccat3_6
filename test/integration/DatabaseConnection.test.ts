import DatabaseConnectionAdapter from "../../src/checkout/infra/database/DatabaseConnectionAdapter";

test.skip("Deve criar uma conexão com o banco de dados", async function () {
    const databaseConnection = new DatabaseConnectionAdapter();
    const items = await databaseConnection.query("select * from ccca.item", []);
    expect(items).toHaveLength(3);
});
