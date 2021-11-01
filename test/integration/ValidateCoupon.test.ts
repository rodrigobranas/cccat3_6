import ValidateCoupon from "../../src/checkout/application/usecase/ValidateCoupon";
import DatabaseConnectionAdapter from "../../src/checkout/infra/database/DatabaseConnectionAdapter";
import CouponRepositoryDatabase from "../../src/checkout/infra/repository/database/CouponRepositoryDatabase";

test("Deve validar o cupom de desconto", async function () {
	const databaseConnection = new DatabaseConnectionAdapter()
	const couponRepository = new CouponRepositoryDatabase(databaseConnection);
	const validateCoupon = new ValidateCoupon(couponRepository);
	const isValid = await validateCoupon.execute("VALE20", new Date("2021-10-01"));
	expect(isValid).toBeTruthy();
});
