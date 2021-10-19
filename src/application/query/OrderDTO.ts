export default class OrdertDTO {

	constructor (readonly id: number, readonly code: string, readonly cpf: string, readonly freight: number, readonly total: number) {
	}
}
