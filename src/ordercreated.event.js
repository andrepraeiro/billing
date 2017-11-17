import { Event } from './event'
export class OrderCreated extends Event {

    static name() {
        return 'OrderCreated'
    }

    constructor(id, date, customerId) {
        super()
        this.eventData = { version: 1, name: OrderCreated.name(), date: new Date() }
        this.id = id
        this.date = date
        this.customerId = customerId
    }
}