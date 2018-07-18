import Order from '../../Domain/Order/order.aggregate'

export default class CreateOrderCommandHandler {
    constructor(repository) {
        this.repository = repository
        this.type = 'CreateOrder'
    }

    handle(message) {
        let order = new Order(message.id, message.orderDate, message.customerId)
        this.repository.save(order, -1)
        return order
    }
}
