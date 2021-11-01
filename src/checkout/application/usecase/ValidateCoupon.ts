import CouponRepository from "../../domain/repository/CouponRepository";

export default class ValidateCoupon {

	constructor (readonly couponRepository: CouponRepository) {	
	}

	async execute (code: string, date: Date): Promise<boolean> {
		const coupon = await this.couponRepository.findByCode(code);
		const isValid = coupon.isValid(date);
		return isValid;
	}
}
