import chai from 'chai'
import CreateOrderCommand from '../commands/order/createOrderCommand'
import CreateOrderCommandHandler from '../commandHandlers/order/createOrderCommandHandler'
import ChangeCustomerCommand from '../commands/order/changeCustomerCommand'
import ChangeCustomerCommandHandler from '../commandHandlers/order/changeCustomerCommandHandler'
import generateUUID from '../common/uuidGenerator'
import BullShitDatabase from '../readModel/readModelFacade'
import EventHandler from '../readModel/eventHandler'
import FakeBus from '../fakeBus'
import EventStore from '../eventStore/eventStore'
import Repository from '../eventStore/repository'

chai.should()

describe('ChangeCustomerCommandHandler', () => {
    describe('create order and change customer of order', () => {
        const database = new BullShitDatabase()
        const eventHandler = new EventHandler(database)
        const bus = new FakeBus(eventHandler)
        const storage = new EventStore(bus)
        const repository =  new Repository(storage)        
        bus.registerHandler(new CreateOrderCommandHandler(repository))
        bus.registerHandler(new ChangeCustomerCommandHandler(repository))        
        const date = new Date()
        const id = generateUUID()        
        const customerId = generateUUID()
        const newCustomerId = generateUUID()
        const createMessage = new CreateOrderCommand(id, date, customerId)
        const orderId = createMessage.id
        const changeMessage = new ChangeCustomerCommand(orderId,newCustomerId)        
        bus.send(createMessage)
        bus.send(changeMessage)
        
        it('aggregate in storage should have two events', () => {            
            const e = repository.storage.getEventsForAggregate(orderId)            
            e.length.should.equal(2)            
        })
        it('id value in first event of aggregate should be equal id', () => {
            const e = repository.storage.getEventsForAggregate(orderId)            
            e[0].eventData.id.should.equal(orderId)            
        })
        it('date value in first event of aggregate should be equal date', () => {
            const e = repository.storage.getEventsForAggregate(orderId)
            e[0].eventData.date.should.equal(date)            
        })

        it('aggregate first event customerId in storage should be equal customerId', () => {
            let e = repository.storage.getEventsForAggregate(orderId)
            e[0].eventData.customerId.should.equal(customerId)            
        })

        it('current aggregate customerId should be equal newCustomerId', () => {            
            const order = repository.getById(orderId)
            order.customerId.should.equal(newCustomerId)
        })
    })
})


