import chai from 'chai'
import path from 'path'
import FakeBus from '../fakeBus';
import EventStore from '../eventStore/eventStore';
import Repository from '../eventStore/repository';
import CreateOrderCommandHandler from '../commandHandlers/order/createOrderCommandHandler';
import CreateOrderCommand from '../commands/order/createOrderCommand';
import generateUUID from '../common/uuidGenerator';
import ChangeCustomerCommandHandler from '../commandHandlers/order/changeCustomerCommandHandler';
import ChangeCustomerCommand from '../commands/order/changeCustomerCommand';


chai.should()

describe('App', () => {
    describe('Init', () => {
        let bus = new FakeBus()
        let storage = new EventStore(bus)
        let repository =  new Repository(storage)
        let command = new CreateOrderCommandHandler(repository)
        let commandc = new ChangeCustomerCommandHandler(repository)
        bus.registerHandler({type: command.type, action: command.handle, commandHandler: command})
        bus.registerHandler({type: commandc.type, action: commandc.handle, commandHandler: commandc})
        let orderId = generateUUID()
        let date = new Date()
        let customerId = generateUUID();
        let newCustomerId = generateUUID();
        bus.send(new CreateOrderCommand(orderId, date, customerId))
        bus.send(new ChangeCustomerCommand(orderId,newCustomerId))
        // storage.current[0].eventDescriptors.forEach(element => {
        //     console.log(element.eventData)    
        // });
        
        it('bus handle', () => {            
            bus.routes.length.should.equal(2)
        })        
    })
})

