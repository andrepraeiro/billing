export default class MockStorage {

    constructor() {
        this.aggregate = null
    }

    saveEvents(aggregateId, type, events, expectedVersion) {
        let eventDescriptors = []
        let agg = this.getAggregate(aggregateId)
        if (agg) {
            this.aggregate = agg
            agg.events.push(events)
            eventDescriptors = this.aggregate.eventDescriptors
        }
        else {
            this.aggregate = {
                id: aggregateId,
                aggregateId: aggregateId,
                type: type,
                events: events,
                eventData: events,
                expectedVersion: expectedVersion,
                version: expectedVersion,
                eventDescriptors: []
            }
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
        });
        this.aggregate.eventDescriptors = eventDescriptors
    }

    getEventsForAggregate(aggregateId) {
        return this.aggregate.events
    }

    getAggregate(id) {
        return this.aggregate
    }
}