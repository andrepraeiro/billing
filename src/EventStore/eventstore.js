export class EventStore {
    
    constructor(publisher){    
        this.publisher = publisher
        this.current = []
    }

    SaveEvents(aggregateId, type, events, expectedVersion) {
       let eventDescriptors
       

    }


}