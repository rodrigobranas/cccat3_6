import OrderCancelled from "../../../shared/domain/event/OrderCancelled";
import OrderPlaced from "../../../shared/domain/event/OrderPlaced";
import Handler from "../../../shared/domain/handler/Handler";
import StockEntry from "../entity/StockEntry";
import StockRepository from "../repository/StockRepository";

export default class OrderCancelledStockHandler implements Handler {

	constructor (readonly stockRepository: StockRepository) {
	}

	async notify(orderCancelled: OrderCancelled): Promise<void> {
		console.log(orderCancelled);
		for (const orderItem of orderCancelled.items) {
			await this.stockRepository.save(new StockEntry(orderItem.idItem, "in", orderItem.quantity));
		}
	}
}
