import { Order } from './order.aggregate'

export class ChangeCustomerCommandHandler {
    constructor(repository) {
        this.repository = repository
    }

    handle(message) {
        let order = this.repository.getById(message.id)
        order.changeCustomer(message.customerId)
        return order
    }
}
