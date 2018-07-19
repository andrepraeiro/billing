import Event from './event'
export default class OrderCreated extends Event {
    constructor(id, date, customerId) {
        super()
        this.eventData = { version: 1, name: this.constructor.name, date: new Date() }
        this.id = id
        this.date = date
        this.customerId = customerId
    }
}
