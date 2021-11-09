export default class ItemDTO {

	constructor (readonly idItem: number, readonly category: string, readonly description: string, readonly price: number, readonly width: number = 0, readonly height: number = 0, readonly length: number = 0, readonly weight: number = 0) {
    }
}
