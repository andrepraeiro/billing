import {Order} from '../Domain/Order/order.aggregate'
import {MockAggregate} from '../../test/Mocks/mockaggregate'

export class DynamicAggregate {
            
    constructor(name, args) {
        this.aggregates = { Order, MockAggregate }                
        return new this.aggregates[name](args)
    }
}