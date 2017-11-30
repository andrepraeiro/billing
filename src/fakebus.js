export class FakeBus {

    constructor(){
        this.routes = []
    }
    
    registerHandler(handler) {
        let handlers = []        
        if (this.routes.findIndex(p => p.type == handler.type) == -1) {
            this.routes.push({type: handler.type, action: handler.action, commandHandler: handler.commandHandler})
        }
        else {
            handlers = this.routes.findIndex(p => p.type == handler.type)
        }
        handlers.push(handler.action)        
    }

    send(command) {
        let handlers = []
        handlers.push(this.routes[this.routes.findIndex(p => p.type == command.type)])
        if (handlers) {
            if (handlers.length != 1) throw 'Cannot send to more than one handler'
            handlers[0].commandHandler.handle(command)
        }
        else
            throw 'Handler not registred'
    }

    publish(event) {        
        let handlers = []        
        if (this.routes.findIndex(p => p.type == event.constructor.name) == -1) 
            return
        handlers = this.routes[this.routes.findIndex(p => p.type == event.constructor.name)]
        
        handlers.forEach(handler => {
            let hand = handler
            hand(event)
        });

    }


}