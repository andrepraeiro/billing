import chai from 'chai'
import path from 'path'
import MockRepository from './mocks/mockRepository'
import MockAggregate from './mocks/mockAggregate'
import MockStorage from './mocks/mockStorage'
import generateUUID from '../common/uuidGenerator'
import MockEvent from './mocks/mockEvent'


chai.should()

describe('Repository', () => {
    describe('Save', () => {
        let repository
        let storage    
        let aggregateRoot
        let id = generateUUID()       
        beforeEach(() => {
            storage = new MockStorage()
            repository = new MockRepository(storage)
            aggregateRoot = new MockAggregate(id)
            repository.save(aggregateRoot,1)
        })

        it('storage have 1 event', () => {            
            repository.storage.aggregate.events.length.should.equal(1)            
        })

        it('storage aggregateId = id', () => {
            repository.storage.aggregate.id.should.equal(aggregateRoot.id)
        })

        it('storage expectedVersion = 1', () => {
            repository.storage.aggregate.expectedVersion.should.equal(1)
        })
    })

    describe('getById', () => {
        let repository
        let storage    
        let aggregateRoot
        let newAggregateRoot
        let id = generateUUID() 
        beforeEach(() => {
            storage = new MockStorage()
            repository = new MockRepository(storage)
            aggregateRoot = new MockAggregate(id)                        
            repository.save(aggregateRoot,1)                      
            newAggregateRoot = repository.getById(id)                        
        })

        it('returned AggregateRoot id from getById should be equal aggregateRoot.id', () => {                        
            newAggregateRoot.id.should.equal(aggregateRoot.id)
        })        
    })
})
