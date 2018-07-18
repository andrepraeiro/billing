import Repository from '../../eventStore/repository'
import MockStorage from './mockStorage'
import DynamicAggregate from '../../eventStore/dynamicAggregate'

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