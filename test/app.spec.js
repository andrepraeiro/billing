import chai from 'chai'
import path from 'path'
import { FakeBus } from '../src/fakebus';
import { EventStore } from '../src/EventStore/eventstore';
import { Repository } from '../src/EventStore/repository';
import { CreateOrderCommandHandler } from '../src/CommandHandlers/Order/createorder.commandhandler';
import { CreateOrderCommand } from '../src/Commands/Order/createorder.command';
import { generateUUID } from '../src/Common/uuidgenerator';
import { ChangeCustomerCommandHandler } from '../src/CommandHandlers/Order/changecustomer.commandhandler';
import { ChangeCustomerCommand } from '../src/Commands/Order/changecustomer.command';


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
        storage.current[0].eventDescriptors.forEach(element => {
            console.log(element.eventData)    
        });
        
        it('bus handle', () => {            
            bus.routes.length.should.equal(2)
        })        
    })
})

