import ItemRepository from "../../domain/repository/ItemRepository";
import FreightCalculator from "../../domain/service/FreightCalculator";
import SimulateFreightInput from "../dto/SimulateFreightInput";

export default class SimulateFreight {

	constructor (readonly itemRepository: ItemRepository) {	
	}

	async execute (input: SimulateFreightInput): Promise<number> {
		let freight = 0;
		for (const itemInput of input.items) {
			const item = await this.itemRepository.findById(itemInput.idItem);
			freight += FreightCalculator.calculate(item) * itemInput.quantity;
		}
		return freight;
	}
}
