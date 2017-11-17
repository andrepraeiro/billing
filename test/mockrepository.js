import { Repository } from '../src/repository'
import { MockStorage } from './mockstorage'

export class MockRepository {
    constructor() {
        this.storage = new MockStorage()
        this.repository = new Repository(this.storage)
    }

    Save(aggregate, expectedVersion) {
        this.repository.Save(aggregate, expectedVersion)        
    }

    getById(id, aggregate) {
        return this.repository.getById(id, aggregate)
    }

}