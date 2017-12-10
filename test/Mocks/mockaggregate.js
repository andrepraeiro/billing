import AggregateRoot from '../../src/Domain/aggregateroot'
import MockEvent from './mockevent'

export default class MockAggregate extends AggregateRoot {
    constructor(id) {
        super()
        this.type = 'MockAggregate'
        super.applyChange(new MockEvent(id),{child: this})
    }

    apply(event) {       
        
        this.id = event.id
        // switch (event.eventData.name) {
        //     case MockEvent.name(): {
        //         this.id = event.id                
        //         break
        //     }
        // }
    }
}