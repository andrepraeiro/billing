export default class BullShitDatabase {
    
    constructor() {
        this.orders = [
            { id: 1, date: new Date() ,customerId: '1' },
            { id: 2, date: new Date() ,customerId: '3' },
          ]
    }

    orderListView(handle, message) {
        switch (handle) {
            case 'ORDER_CREATED':
                addOrder(message)
                break;
        
            default:
                break;
        }
    }

    addOrder() {
        this.addOrder.push(message)
    }

    getOrders() {
        return this.orders
    }
}
