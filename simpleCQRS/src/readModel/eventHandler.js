import orderCreatedEvent from '../events/orderCreatedEvent'

export default class EventHandler {
    constructor(database) {
        this.rm = database
    }

    notify(event) {
        switch (event.eventData.name) {
            case 'OrderCreated': {
                this.rm.addOrder(event)
                break
            }
            default:
                break
        }
    }
}
