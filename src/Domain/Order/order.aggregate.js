import { AggregateRoot } from '../aggregateroot'
import { OrderCreated } from '../../Events/ordercreated.event'
import { CustomerChanged } from '../../Events/customerchanged.event'

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
            case CustomerChanged.name(): {
                this.customerId = event.customerId
                break
            }
        }
    }

    changeCustomer(customerId){        
        super.applyChange(new CustomerChanged(this.id, customerId), {child: this})               
    }
}
