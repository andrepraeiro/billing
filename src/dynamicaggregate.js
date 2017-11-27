import {Order} from './order.aggregate'
export class DynamicAggregate {
    
    aggregates ={
        Order
    }
    constructor(name, args) {
        return new aggregates[name](args)
    }
}