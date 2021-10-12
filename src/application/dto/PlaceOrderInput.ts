export default class PlaceOrderInput {

    constructor (readonly cpf: string, readonly orderItems: any[], readonly issueDate: Date = new Date(), readonly coupon?: string) {
    }
}
