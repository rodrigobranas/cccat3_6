import ItemDAO from "./ItemDAO";
import ItemDTO from "./ItemDTO";

export default class GetItems {

	constructor (readonly itemDAO: ItemDAO) {
	}

	async execute (): Promise<ItemDTO[]> {
		const itemsDTO = await this.itemDAO.getItems();
		return itemsDTO;
	}
}