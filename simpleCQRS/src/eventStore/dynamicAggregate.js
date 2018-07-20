import Order from '../domain/order/orderAggregate'
import MockAggregate from '../test/Mocks/mockaggregate'

export default class DynamicAggregate {
    constructor(name, args) {
        switch (name) {
            case 'Order':
                return new Order()
            default:
                this.aggregates = { Order, MockAggregate }
                return new this.aggregates[name](args)
        }
    }
}
