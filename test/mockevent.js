import { Event } from '../src/event'

export class MockEvent extends Event {

    static name() {
        return 'MockEvent'
    }
    constructor(id) {
        super()
        this.eventData = { version: 1, name: MockEvent.name(), date: new Date() }
        this.id = id
    }
}