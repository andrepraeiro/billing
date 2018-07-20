import AggregateRoot from '../domain/aggregateRoot'
import DynamicAggregate from './dynamicAggregate'

export default class Repository {

    constructor(storage) {
        this.storage = storage
    }

    save(aggregate, expectedVersion) {
        this.storage.saveEvents(
            aggregate.id,
            aggregate.type,
            aggregate.getUncommitedChanges(),
            expectedVersion)
    }

    getById(id) {        
        const storedAggregate = this.storage.getAggregate(id)        
        const aggregate = new DynamicAggregate(storedAggregate.type)        
        aggregate.loadsFromHistory(storedAggregate.eventDescriptors)        
        return aggregate;
    }


}