export class MockStorage {

    constructor() {
        this.aggregate = null
    }

    SaveEvents(aggregateId, type, events, expectedVersion) {
        this.aggregate = {
            id: aggregateId,
            type: type,
            events: events,
            expectedVersion: expectedVersion
        }
    }

    getEventsForAggregate(aggregateId) {
        return this.aggregate.events
    }
}