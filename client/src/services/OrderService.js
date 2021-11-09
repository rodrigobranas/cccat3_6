export default class OrderService {

	constructor (httpAdapter, data) {
		this.httpAdapter = httpAdapter;
		this.data = data;
		this.data.addItem = (item) => {
			const existingItem = this.data.order.orderItems.find(orderItem => orderItem.idItem === item.id);
			if (existingItem) {
				existingItem.quantity++;
			} else {
				this.data.order.orderItems.push({
					idItem: item.id,
					quantity: 1,
					item
				});
			}
			this.data.order.total += parseFloat(item.price);
		}
		this.data.getItems = async () => {
			const response = await this.httpAdapter.get("http://localhost:3000/items");
			this.data.items = response.data;
		}
	
		this.data.addItem = (item) => {
			const existingItem = this.data.order.orderItems.find(orderItem => orderItem.idItem === item.id);
			if (existingItem) {
				existingItem.quantity++;
			} else {
				this.data.order.orderItems.push({
					idItem: item.id,
					quantity: 1,
					item
				});
			}
			this.data.order.total += parseFloat(item.price);
		}
	
		this.data.removeItem = (item) => {
			const existingItem = this.data.order.orderItems.find(orderItem => orderItem.idItem === item.id);
			if (existingItem) {
				existingItem.quantity--;
				this.data.order.total -= parseFloat(item.price);
				if (existingItem.quantity === 0) {
					this.data.order.orderItems.splice(this.data.order.orderItems.indexOf(existingItem), 1);
				}
			}
		}
	
		this.data.confirm = async (order) => {
			const response = await this.httpAdapter.post("http://localhost:3000/orders", order);
			this.data.newOrder = response.data;
		}
	}
}
