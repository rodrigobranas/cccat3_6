import Coupon from "../../src/domain/entity/Coupon";
import Item from "../../src/domain/entity/Item";
import Order from "../../src/domain/entity/Order";

test("Não deve criar um pedido com CPF inválido", function () {
    expect(() => new Order("111.111.111-11")).toThrow(new Error("Invalid cpf"));
});

test("Deve criar um pedido", function () {
    const order = new Order("847.903.332-05");
    expect(order).toBeDefined();
});

test("Deve criar um pedido com 3 itens", function () {
    const order = new Order("847.903.332-05");
    order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1);
    order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000), 1);
    order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30), 3);
    const total = order.getTotal();
    expect(total).toBe(6090);
});

test("Deve criar um pedido com 3 itens com cupom de desconto", function () {
    const order = new Order("847.903.332-05");
    order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1);
    order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000), 1);
    order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30), 3);
    order.addCoupon(new Coupon("VALE20", 20));
    const total = order.getTotal();
    expect(total).toBe(4872);
});

test("Deve criar um pedido com 3 itens com cupom de desconto expirado", function () {
    const order = new Order("847.903.332-05", new Date("2021-10-10"));
    order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1);
    order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000), 1);
    order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30), 3);
    order.addCoupon(new Coupon("VALE20", 20, new Date("2021-03-01")));
    const total = order.getTotal();
    expect(total).toBe(6090);
});

test("Deve criar um pedido com o código gerado", function () {
    const order = new Order("847.903.332-05", new Date("2021-03-01"));
    order.addItem(new Item(1, "Instrumentos Musicais", "Guitarra", 1000), 1);
    order.addItem(new Item(2, "Instrumentos Musicais", "Amplificador", 5000), 1);
    order.addItem(new Item(3, "Instrumentos Musicais", "Cabo", 30), 3);
    const code = order.code;
    expect(code.value).toBe("202100000001");
});
