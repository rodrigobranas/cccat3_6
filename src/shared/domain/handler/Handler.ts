import DomainEvent from "../event/DomainEvent";

export default interface Handler {
	notify (event: DomainEvent): Promise<void>;
}
