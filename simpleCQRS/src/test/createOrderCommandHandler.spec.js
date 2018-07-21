import chai from 'chai'
import path from 'path'
import CreateOrderCommandHandler from '../commandHandlers/order/createOrderCommandHandler'
import MockRepository from './mocks/mockRepository'
import CreateOrderCommand from '../commands/order/createOrderCommand'
import generateUUID from '../common/uuidGenerator'
import Order from '../domain/order/orderAggregate'
import BullShitDatabase from '../readModel/readModelFacade'
import EventHandler from '../readModel/eventHandler'
import FakeBus from '../fakeBus'
import EventStore from '../eventStore/eventStore'
import Repository from '../eventStore/repository'


chai.should()

describe('CreateOrderCommandHandler', () => {
    describe('constructor', () => {
        const repository = new MockRepository();
        const comHand  = new CreateOrderCommandHandler(repository);        
        const date = new Date()
        const message = new CreateOrderCommand(null, date, 4508)
        const id = message.id
        comHand.handle(message)            
        
        it('Save item into repository', () => {
            const e = comHand.repository.storage.getEventsForAggregate(id)
            e.length.should.equal(1)            
        })
        it('Saved event aggregate id in repository should be event', () => {
            const e = comHand.repository.storage.getEventsForAggregate(id)
            e[0].id.should.equal(id)            
        })
        it('Saved event aggregate date in repository should be event', () => {
            const e = comHand.repository.storage.getEventsForAggregate(id)
            e[0].date.should.equal(date)            
        })
    })
})

describe('CreateOrderCommandHandler', () => {
    describe('Recupered Aggregate', () => {
        const repository = new MockRepository();
        const comHand  = new CreateOrderCommandHandler(repository);        
        const date = new Date()
        const message = new CreateOrderCommand(id, date, 4508)        
        const id = message.id
        comHand.handle(message)
        const aggregate = comHand.repository.getById(id)            
        
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
