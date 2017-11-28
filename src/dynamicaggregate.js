import {Order} from './order.aggregate'
import {MockAggregate} from '../test/mockaggregate'

export class DynamicAggregate {
            
    constructor(name, args) {
        this.aggregates = { Order, MockAggregate }                
        return new this.aggregates[name](args)
    }
}