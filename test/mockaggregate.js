import { AggregateRoot } from '../src/aggregateRoot'
import { MockEvent } from './mockevent'

export class MockAggregate extends AggregateRoot {
    constructor(id) {
        super()
        super.applyChange(new MockEvent(id),{child: this})
    }

    apply(event) {
        this.id = event.id
    }
}