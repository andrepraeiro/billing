import chai from 'chai'
import path from 'path'
import CreateOrderCommand from '../commands/order/createOrderCommand'

chai.should()

describe('CreateOrderCommand', () => {
    describe('constructor', () => {
        let command
        let currentDate = Date.now()
        let orderId = 1
        let customerId = 1
        beforeEach(() => {
            command = new CreateOrderCommand(orderId, currentDate, customerId)
        })

        it('returns the id', () => {
            command.id.should.equal(orderId)
        })

        it('return the OrderDate', () => {
            command.orderDate.should.equal(currentDate)
        })

        it('return customerId', () => {
            command.customerId.should.equal(customerId);
        })
    })
})

