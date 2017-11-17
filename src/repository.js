import { AggregateRoot } from './aggregateRoot'

export class Repository {

    constructor(storage) {
        this.storage = storage
    }

    Save(aggregate, expectedVersion) {
        this.storage.SaveEvents(
            aggregate.id,
            aggregate.type,
            aggregate.getUncommitedChanges(),
            expectedVersion)
    }

    getById(id, aggregate) {
        let events = this.storage.getEventsForAggregate(id)
        aggregate.loadsFromHistory(events)
        return aggregate;
    }


}