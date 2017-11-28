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
        let storedAggregate = this.storage.getAggregate(id)
        let aggregate = new DynamicAggregate(storedAggregate.type)
        aggregate.loadsFromHistory(storedAggregate.events)
        return aggregate;
    }


}