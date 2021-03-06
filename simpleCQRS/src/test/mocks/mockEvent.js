import Event  from '../../events/event'

export default class MockEvent extends Event {

    static name() {
        return 'MockEvent'
    }
    constructor(id) {
        super()
        this.eventData = { version: 1, name: MockEvent.name(), date: new Date() }
        this.id = id
    }
}