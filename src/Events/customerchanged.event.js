import { Event } from './event'
export class CustomerChanged extends Event {

    
    constructor(id, customerId) {
        
        super()        
        this.eventData = { version: 1, name: this.constructor.name, date: new Date() }
        this.id = id        
        this.customerId = customerId
    }
}