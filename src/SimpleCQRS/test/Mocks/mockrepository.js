import Repository from '../../EventStore/repository'
import MockStorage from './mockstorage'
import DynamicAggregate from '../../EventStore/dynamicaggregate'

export default class MockRepository {
    constructor() {
        this.storage = new MockStorage()
        this.repository = new Repository(this.storage)
    }

    save(aggregate, expectedVersion) {
        this.repository.save(aggregate, expectedVersion)        
    }
    
    getById(id) {        
        this.aggregate = this.repository.getById(id);
        return this.aggregate
    }

}