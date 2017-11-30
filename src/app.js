
import { FakeBus } from './fakebus'
import { EventStore } from './EventStore/eventstore'
import { Repository } from './EventStore/repository'
import { CreateOrderCommandHandler } from './CommandHandlers/Order/createorder.commandhandler';

startApp = function() {
    let bus = new FakeBus()
    let storage = new EventStore(bus)
    let repository =  new Repository(storage)
    let commands = new CreateOrderCommandHandler(repository)
    bus.registerHandler(commands.handle)
}

startApp()
