import { Event } from './event'
export class CustomerChanged extends Event {

    static name() {
        return 'CustomerChanged'
    }
    
    constructor(id, date, customerId) {
        
        super()        
        this.eventData = { version: 1, name: CustomerChanged.name(), date: new Date() }
        this.id = id        
        this.customerId = customerId
    }
}