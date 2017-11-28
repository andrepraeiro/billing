import chai from 'chai'
import path from 'path'
import { MockRepository } from './mockrepository'
import { CreateOrderCommand } from '../src/createorder.command'
import { CreateOrderCommandHandler } from '../src/createorder.commandhandler'
import { ChangeCustomerCommand } from '../src/changecustomer.command'
import { ChangeCustomerCommandHandler } from '../src/changecustomer.commandhandler'
import { generateUUID } from '../src/uuidgenerator'
import { Order} from '../src/order.aggregate'

chai.should()

describe('ChangeCustomerCommandHandler', () => {
    describe('constructor', () => {
        let repository = new MockRepository();
        let CreateComHand  = new CreateOrderCommandHandler(repository);
        let ChangeComHand  = new ChangeCustomerCommandHandler(repository);
        let id = generateUUID()        
        let date = new Date()
        let customerId = generateUUID()
        let newCustomerId = generateUUID()
        let createMessage = new CreateOrderCommand(id, date, customerId)
        let changeMessage = new ChangeCustomerCommand(id,newCustomerId)
        let aggregate
        CreateComHand.handle(createMessage)                    
        aggregate = ChangeComHand.handle(changeMessage)
        
        it('Save item into repository', () => {
            let e = repository.storage.getEventsForAggregate(id)            
            e.length.should.equal(2)            
        })
        it('Saved event aggregate id in repository should be event', () => {
            let e = repository.storage.getEventsForAggregate(id)
            e[0].id.should.equal(id)            
        })
        it('Saved event aggregate date in repository should be event', () => {
            let e = repository.storage.getEventsForAggregate(id)
            e[0].date.should.equal(date)            
        })

        it('Saved event aggregate customerId in repository should be event', () => {
            let e = repository.storage.getEventsForAggregate(id)
            e[0].customerId.should.equal(customerId)            
        })

        it('Saved event aggregate customerId in repository should be new customerIs', () => {            
    
            aggregate.customerId.should.equal(newCustomerId)
        })
    })
})


