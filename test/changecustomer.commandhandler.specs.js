import chai from 'chai'
import path from 'path'
import MockRepository from './Mocks/mockrepository'
import CreateOrderCommand from '../src/Commands/Order/createorder.command'
import CreateOrderCommandHandler from '../src/CommandHandlers/Order/createorder.commandhandler'
import ChangeCustomerCommand from '../src/Commands/Order/changecustomer.command'
import ChangeCustomerCommandHandler from '../src/CommandHandlers/Order/changecustomer.commandhandler'
import generateUUID from '../src/Common/uuidgenerator'
import Order from '../src/Domain/Order/order.aggregate'

chai.should()

describe('ChangeCustomerCommandHandler', () => {
    describe('create order and change customer of order', () => {
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
        
        it('aggregate in storage should have two events', () => {
            let e = repository.storage.getEventsForAggregate(id)            
            e.length.should.equal(2)            
        })
        it('id value in first event of aggregate should be equal id', () => {
            let e = repository.storage.getEventsForAggregate(id)
            e[0].id.should.equal(id)            
        })
        it('date value in first event of aggregate should be equal date', () => {
            let e = repository.storage.getEventsForAggregate(id)
            e[0].date.should.equal(date)            
        })

        it('aggregate first event customerId in storage should be equal customerId', () => {
            let e = repository.storage.getEventsForAggregate(id)
            e[0].customerId.should.equal(customerId)            
        })

        it('current aggregate customerId should be equal newCustomerId', () => {            
            aggregate.customerId.should.equal(newCustomerId)
        })
    })
})


