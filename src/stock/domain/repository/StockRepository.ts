import StockEntry from "../entity/StockEntry";

export default interface StockRepository {

	save (stockEntry: StockEntry): Promise<void>;
}
