import Order from '../../domain/order/orderAggregate'

export default class ChangeCustomerCommandHandler {
    constructor(repository) {
        this.repository = repository
    }

    handle(message) {
        let order = this.repository.getById(message.id)
        order.changeCustomer(message.customerId)     
        this.repository.save(order, -1)           
        return order
    }
}