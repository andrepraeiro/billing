import Order from '../Domain/Order/order.aggregate'
import MockAggregate from '../../test/Mocks/mockaggregate'

export default class DynamicAggregate {
            
    constructor(name, args) {
        this.aggregates = { Order, MockAggregate }                
        return new this.aggregates[name](args)
    }
}