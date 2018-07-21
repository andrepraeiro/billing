import chai from 'chai'
import CreateOrderCommand from '../commands/order/createOrderCommand'

chai.should()

describe('CreateOrderCommand', () => {
    describe('constructor', () => {
        const data = {
            currentDate: Date.now(),
            customerId: 1,
            command: null,
            orderId: null
        }
        beforeEach(() => {
            data.command = new CreateOrderCommand(data.orderId, data.currentDate, data.customerId)
            data.orderId = data.command.id
        })

        it('returns the id', () => {
            data.command.id.should.equal(data.orderId)
        })

        it('return the OrderDate', () => {
            data.command.orderDate.should.equal(data.currentDate)
        })

        it('return customerId', () => {
            data.command.customerId.should.equal(data.customerId)
        })
    })
})
