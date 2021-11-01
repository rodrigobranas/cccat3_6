import Coupon from "../../src/checkout/domain/entity/Coupon";

test("Deve criar um cupom de desconto válido", function () {
    const coupon = new Coupon("VALE20", 20, new Date("2021-10-10"));
    const isExpired = coupon.isExpired(new Date("2021-09-10"));
    expect(isExpired).toBeFalsy();
});

test("Deve criar um cupom de desconto inválido", function () {
    const coupon = new Coupon("VALE20", 20, new Date("2021-09-10"));
    const isExpired = coupon.isExpired(new Date("2021-10-10"));
    expect(isExpired).toBeTruthy();
});

test("Deve criar um cupom de desconto que não expira nunca", function () {
    const coupon = new Coupon("VALE20", 20);
    const isExpired = coupon.isExpired(new Date("2021-10-10"));
    expect(isExpired).toBeFalsy();
});
