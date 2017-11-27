import { AggregateRoot } from './aggregateroot'
import { DynamicAggregate } from './dynamicaggregate'

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

    getById(id) {
        let events = this.storage.getEventsForAggregate(id)
        let aggregate = new DynamicAggregate(events[0].type)
        aggregate.loadsFromHistory(events)
        return aggregate;
    }


}