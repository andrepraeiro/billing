export default class BullShitDatabase {
    constructor() {
        this.orders = [{ id: 1, date: new Date(), customerId: '1' }, { id: 2, date: new Date(), customerId: '3' }]
    }

    addOrder(message) {
        const order = {
            id: message.id,
            date: message.date,
            customerId: message.customerId
        }
        this.orders.push(order)
        return order
    }

    changeCustomer(message) {
        const order = this.orders.find(e => e.id == message.id)
        if (order) {
            order.customerId = message.customerId
            return order
        } else
            return {
                message: 'Order not found.',
                orderId: message.id
            }
    }

    getOrders() {
        return this.orders
    }

    getOrder(id) {
        const order = this.orders.find(e => e.id == id)
        if (!order)
            return {
                message: 'Order not found.',
                orderId: id
            }
        else return order
    }
}
