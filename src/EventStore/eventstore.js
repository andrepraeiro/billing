export class EventStore {

    constructor(publisher) {
        this.publisher = publisher
        this.current = []
    }

    saveEvents(aggregateId, type, events, expectedVersion) {
        let eventDescriptors =
            this.current[this.current.findIndex(p => p.aggregateId == aggregateId)] == undefined ? [] :
                this.current[this.current.findIndex(p => p.aggregateId == aggregateId)].eventDescriptors

        if (!this.current[this.current.findIndex(p => p.aggregateId == aggregateId)]) {
            eventDescriptors = []
            this.current.push({ aggregateId: aggregateId, type: type, eventDescriptors: eventDescriptors })
        }
        else if (eventDescriptors[eventDescriptors.length - 1].version !=
            expectedVersion && expectedVersion != -1) {
            throw 'Concurrency exception'
        }
        
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
        this.current[this.current.findIndex(p => p.aggregateId == aggregateId)].eventDescriptors = eventDescriptors
    }

    getEventsForAggregate(aggregateId) {
        return this.current[this.current.findIndex(p => p.aggregateId == aggregateId)].eventDescriptors.eventData
    }

    getAggregate(aggregateId) {
        return this.current[this.current.findIndex(p => p.aggregateId == aggregateId)]
    }
}
