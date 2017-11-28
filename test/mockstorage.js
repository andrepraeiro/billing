export class MockStorage {

    constructor() {
        this.aggregate = null
    }

    SaveEvents(aggregateId, type, events, expectedVersion) {
        let agg = this.getAggregate(aggregateId)
        if(agg) {        
            this.aggregate = agg
            agg.events.push(events);
        }
        else {
            this.aggregate = {
                id: aggregateId,
                type: type,
                events: events,
                expectedVersion: expectedVersion
            }
        }
    }

    getEventsForAggregate(aggregateId) {
        return this.aggregate.events
    }

    getAggregate(id) {
        return this.aggregate
    }
}