import uuidGenerator from '../../common/uuidGenerator'

export default class CreateOrderCommand {
    constructor(id, orderDate, customerId){        
        this.id = uuidGenerator()
        this.orderDate = orderDate
        this.customerId = customerId
        this.type = 'CreateOrder'
    }
}


