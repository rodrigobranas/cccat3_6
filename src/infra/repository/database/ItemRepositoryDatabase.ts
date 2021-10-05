import DatabaseConnection from "../../database/DatabaseConnection";
import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";

export default class ItemRepositoryDatabase implements ItemRepository {

    constructor (readonly databaseConnection: DatabaseConnection) {
    }

    async findById(idItem: number): Promise<Item> {
        const [itemData] = await this.databaseConnection.query("select * from ccca.item where id = $1", [idItem]);
        const item = new Item(itemData.id, itemData.category, itemData.description, parseFloat(itemData.price));
        return item;
    }
}
