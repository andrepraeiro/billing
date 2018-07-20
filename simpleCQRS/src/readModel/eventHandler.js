
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
            case 'CustomerChanged': {
                this.rm.changeCustomer(event)
                break
            }
            default:
                break
        }
    }
}
