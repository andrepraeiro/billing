import { Repository } from '../../src/EventStore/repository'
import { MockStorage } from './mockstorage'
import { DynamicAggregate } from '../../src/EventStore/dynamicaggregate'

export class MockRepository {
    constructor() {
        this.storage = new MockStorage()
        this.repository = new Repository(this.storage)
    }

    Save(aggregate, expectedVersion) {
        this.repository.Save(aggregate, expectedVersion)        
    }
    
    getById(id) {        
        this.aggregate = this.repository.getById(id);
        return this.aggregate
    }

}