export default class BullShitDatabase {
    constructor() {
        this.orders = [{ id: 1, date: new Date(), customerId: '1' }, { id: 2, date: new Date(), customerId: '3' }]
    }

    orderListView(handle, message) {
        switch (handle) {
            case 'ORDER_CREATED':
                addOrder(message)
                break

            default:
                break
        }
    }

    addOrder(message) {
        const order = {
            id: message.id,
            date: message.date,
            customerId: message.customerId
        }
        this.orders.push(order)
    }

    getOrders() {
        return this.orders
    }

    getOrder(id) {
        const order = this.orders.find(e => (e.id == id))
        if (!order)
            return {
                message: 'Order not found.',
                orderId: id
            }
        else return order
    }
}
