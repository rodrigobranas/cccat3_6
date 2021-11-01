import DatabaseConnection from "../../database/DatabaseConnection";
import CouponRepository from "../../../domain/repository/CouponRepository";
import Coupon from "../../../domain/entity/Coupon";

export default class CouponRepositoryDatabase implements CouponRepository {

    constructor (readonly databaseConnection: DatabaseConnection) {
    }

    async findByCode(code: string): Promise<Coupon> {
        const [couponData] = await this.databaseConnection.query("select * from ccca.coupon where code = $1", [code]);
        if (!couponData) throw new Error("Coupon not found"); 
		const coupon = new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
        return coupon;
    }
}
