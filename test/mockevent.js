import { Event } from '../src/event'

export class MockEvent extends Event {
    constructor(id) {
        super()
        this.id = id
    }
}