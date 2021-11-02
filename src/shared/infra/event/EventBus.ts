import DomainEvent from "../../domain/event/DomainEvent";
import Handler from "../../domain/handler/Handler";

export default class EventBus {
	consumers: { eventName: string, handler: Handler }[];

	constructor () {
		this.consumers = [];
	}

	subscribe (eventName: string, handler: Handler) {
		this.consumers.push({ eventName, handler });
	}

	async publish (event: DomainEvent) {
		for (const consumer of this.consumers) {
			if (consumer.eventName === event.name) {
				await consumer.handler.notify(event);
			}
		}
	}
}