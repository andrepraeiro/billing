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
        it('Database getOrders should be 3', () => {            
            database.getOrders().length.should.equal(3)
        })        
        it('Database getOrder should be order', () => {            
            const orderRet = database.getOrder(order.id)
            orderRet.id.should.equal(order.id)
            orderRet.date.should.equal(order.orderDate)
            orderRet.customerId.should.equal(order.customerId)
        })        
        it('Database getOrder id not found', () => {            
            const newId = generateUUID()
            const orderRet = database.getOrder(newId)
            orderRet.orderId.should.equal(newId)
            orderRet.message.should.equal('Order not found.')            
        })        
        it('Database addOrder', () => {            
            const message = {
                id: orderId,
                date: date,
                customerId: customerId
            }
            const orderRet= database.addOrder(message)            
            orderRet.id.should.equal(message.id)
            orderRet.date.should.equal(message.date)
            orderRet.customerId.should.equal(message.customerId)
        })        
        it('Database changeCustomer', () => {            
            const message = {
                id: orderId,
                date: date,
                customerId: customerId
            }
            const changeCustomerMessage = {
                id: orderId,
                customerId: generateUUID()
            }
            database.addOrder(message)            
            const orderRet = database.changeCustomer(changeCustomerMessage)            
            orderRet.id.should.equal(changeCustomerMessage.id)
            orderRet.date.should.equal(message.date)
            orderRet.customerId.should.equal(changeCustomerMessage.customerId)
        })        
        it('Database changeCustomer wrong id', () => {            
            const message = {
                id: orderId,
                date: date,
                customerId: customerId
            }
            const changeCustomerMessage = {
                id: generateUUID(),
                customerId: generateUUID()
            }
            database.addOrder(message)            
            const orderRet = database.changeCustomer(changeCustomerMessage)            
            orderRet.orderId.should.equal(changeCustomerMessage.id)
            orderRet.message.should.equal('Order not found.')            
        })        
    })
})


