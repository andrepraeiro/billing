import chai from 'chai'
import path from 'path'
import OrderCreated from '../events/orderCreatedEvent'

chai.should()

describe('OrderCreated.event', () => {
    describe('constructor', () => {
        let event
        let id = 1
        let date = new Date()
        let customerId = 225
        beforeEach(() => {
            event = new OrderCreated(id, date, customerId)
        })
        it('event id should be id', () => {
            event.id.should.equal(id)
        })

        it('event date should be date', () => {
            event.date.should.equal(date)
        })

        it('event customerId should be customerId', () => {
            event.customerId.should.equal(customerId)
        })
        
        it('event data should be OrderCreated.name', () => {
            event.eventData.name.should.equal('OrderCreated')
        })
    })

    describe('constructor null', () => {
        let event
        let id = 1
        let date = new Date()
        let customerId = 225
        beforeEach(() => {
            event = new OrderCreated()
        })
        it('event data should be OrderCreated.name', () => {
            event.eventData.name.should.equal('OrderCreated')
        })
    })
})