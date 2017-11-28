import { Order } from '../../Domain/Order/order.aggregate'

export class CreateOrderCommandHandler {
    constructor(repository) {
        this.repository = repository
    }

    handle(message) {
        let order = new Order(message.id, message.orderDate, message.customerId)
        this.repository.Save(order, -1)
        return order
    }
}
