export default class CreateOrderCommand {
    constructor(id, orderDate, customerId){
        this.id = id
        this.orderDate = orderDate
        this.customerId = customerId
        this.type = 'CreateOrder'
    }
}


