import { AggregateRoot } from './aggregateRoot'
import { OrderCreated } from './ordercreated.event'

export class Order extends AggregateRoot {


    constructor(id, date, customerId) {
        super()
        this.type = 'Order'
        this.id = id
        this.date = null
        this.customerId = null
        if (id) {            
            super.applyChange(new OrderCreated(id, date, customerId), { child: this })
        }                    
    }

    apply(event) {
        switch (event.eventData.name) {
            case OrderCreated.name(): {
                this.id = event.id
                this.date = event.date
                this.customerId = event.customerId
                break
            }
        }
    }
}

