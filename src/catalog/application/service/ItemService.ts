import ItemDAO from "../query/ItemDAO";
import ItemDTO from "../query/ItemDTO";

export default class ItemService {

	constructor (readonly itemDAO: ItemDAO) {
	}

	saveItem (itemDTO: ItemDTO) {
		this.itemDAO.save(itemDTO);
	}
}