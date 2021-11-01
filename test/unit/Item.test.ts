import Item from "../../src/checkout/domain/entity/Item";

test("Deve criar um item", function () {
    const item = new Item(1, "Instrumentos Musicais", "Guitarra", 1000);
    expect(item.idItem).toBe(1);
});

test("Deve criar um item e calcular o volume", function () {
    const item = new Item(1, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10);
    const volume = item.getVolume();
    expect(volume).toBe(0.03)
});

test("Deve criar um item e calcular a densidade", function () {
    const item = new Item(1, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3);
    const density = item.getDensity();
    expect(density).toBe(100);
});

test("Deve criar um item e calcular o frete", function () {
    const item = new Item(1, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3);
    const freight = item.getFreight();
    expect(freight).toBe(30);
});

test("Deve criar um item e calcular o frete mínimo", function () {
    const item = new Item(3, "Instrumentos Musicais", "Cabo", 30, 10, 10, 10, 0.9);
    const freight = item.getFreight();
    expect(freight).toBe(10);
});
