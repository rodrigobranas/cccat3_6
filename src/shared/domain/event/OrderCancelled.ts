import DomainEvent from "./DomainEvent";

export default class OrderCancelled implements DomainEvent {
	name: string;

	constructor (readonly code: string, readonly items: { idItem: number, quantity: number }[]) {
		this.name = "OrderCancelled";
	}
}
