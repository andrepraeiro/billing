export class BullShitDatabase {
    constructor() {
        this.Orders = []
    }

    export orderListView(handle, message) {
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
}
