import chai from 'chai'
import path from 'path'
import FakeBus from '../fakeBus'
import EventStore from '../eventStore/eventStore'
import Repository from '../eventStore/repository'
import CreateOrderCommandHandler from '../commandHandlers/order/createOrderCommandHandler'
import CreateOrderCommand from '../commands/order/createOrderCommand'
import generateUUID from '../common/uuidGenerator'
import ChangeCustomerCommandHandler from '../commandHandlers/order/changeCustomerCommandHandler'
import ChangeCustomerCommand from '../commands/order/changeCustomerCommand'
import BullShitDatabase from '../readModel/readModelFacade'
import EventHandler from '../readModel/eventHandler'


chai.should()

describe('App', () => {
    describe('Init', () => {
        const database = new BullShitDatabase()
        const eventHandler = new EventHandler(database)
        const bus = new FakeBus(eventHandler)
        const storage = new EventStore(bus)
        const repository =  new Repository(storage)        
        bus.registerHandler(new CreateOrderCommandHandler(repository))
        bus.registerHandler(new ChangeCustomerCommandHandler(repository))
        const orderId = generateUUID()
        const date = new Date()
        const customerId = generateUUID();
        const order = new CreateOrderCommand(orderId, date, customerId)
        bus.send(order)        
        it('bus handle', () => {            
            bus.routes.length.should.equal(2)
        })                
    })
})


