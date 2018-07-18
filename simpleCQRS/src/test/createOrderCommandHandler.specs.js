import chai from 'chai'
import path from 'path'
import CreateOrderCommandHandler from '../commandHandlers/order/createOrderCommandHandler'
import MockRepository from './mocks/mockRepository'
import CreateOrderCommand from '../commands/order/createOrderCommand'
import generateUUID from '../common/uuidGenerator'
import Order from '../domain/order/orderAggregate'

chai.should()

describe('CreateOrderCommandHandler', () => {
    describe('constructor', () => {
        let repository = new MockRepository();
        let comHand  = new CreateOrderCommandHandler(repository);
        let id = generateUUID()        
        let date = new Date()
        let message = new CreateOrderCommand(id, date, 4508)
        let aggregate
        aggregate = comHand.handle(message)            
        
        it('Save item into repository', () => {
            let e = comHand.repository.storage.getEventsForAggregate(id)
            e.length.should.equal(1)            
        })
        it('Saved event aggregate id in repository should be event', () => {
            let e = comHand.repository.storage.getEventsForAggregate(id)
            e[0].id.should.equal(id)            
        })
        it('Saved event aggregate date in repository should be event', () => {
            let e = comHand.repository.storage.getEventsForAggregate(id)
            e[0].date.should.equal(date)            
        })
    })
})

describe('CreateOrderCommandHandler', () => {
    describe('Recupered Aggregate', () => {
        let repository = new MockRepository();
        let comHand  = new CreateOrderCommandHandler(repository);
        let id = generateUUID()        
        let date = new Date()
        let message = new CreateOrderCommand(id, date, 4508)
        let aggregate
        comHand.handle(message)
        aggregate = comHand.repository.getById(id)            
        
         it('Aggregate id', () => {
             aggregate.id.should.equal(id)
         })        
        it('Aggregate date', () => {
            aggregate.date.should.equal(date)
        })        
         it('Aggregate customer id', () => {
             aggregate.customerId.should.equal(4508)
         })        
    })
})