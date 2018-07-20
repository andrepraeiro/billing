export default class FakeBus {

    constructor(eventHandler){
        this.routes = []
        this.eventHandler = eventHandler
    }
    
    registerHandler(handler) {
        let handlers = []        
        
        if (!this.routes.includes(handler))
        {
            this.routes.push(handler)
        }            
    }

    send(command) {
        const hand = this.routes.find( e => e.type == command.type)        
        hand.handle(command)                
    }

    publish(event) {        
        this.eventHandler.notify(event)        
    }


}