export default class EventStore {

    constructor(publisher) {
        this.publisher = publisher
        this.current = []
    }

    saveEvents(aggregateId, type, events, expectedVersion) {        
        let eventDescriptors = []
        const aggregate = this.current.find( a=> a.aggregateId == aggregateId)
        if (!aggregate){
            this.current.push({aggregateId: aggregateId, type: type, eventDescriptors: []})            
        }
        else
             eventDescriptors = aggregate.eventDescriptors

        let i = expectedVersion
        events.forEach(event => {
            i++
            event.version = i
            eventDescriptors.push({
                aggregateId: aggregateId,
                eventData: event,
                version: i
            })                                    
            this.publisher.publish(event)
        });
        this.current.find( a=> a.aggregateId == aggregateId).eventDescriptors = eventDescriptors        
    }

    getEventsForAggregate(aggregateId) {
        return this.current.find(p => p.aggregateId == aggregateId).eventDescriptors
    }

    getAggregate(aggregateId) {
        return this.current.find(p => p.aggregateId == aggregateId)
    }
}
