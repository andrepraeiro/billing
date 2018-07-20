import Order from '../../domain/order/orderAggregate'

export default class ChangeCustomerCommandHandler {
    constructor(repository) {
        this.repository = repository
        this.type = 'ChangeCustomer'
    }

    handle(message) {
        const order = this.repository.getById(message.id)                
        order.changeCustomer(message.customerId)     
        this.repository.save(order, order.version)                   
        return order        
    }
}
