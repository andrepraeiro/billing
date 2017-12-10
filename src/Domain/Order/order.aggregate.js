import AggregateRoot from '../aggregateroot'
import OrderCreated from '../../Events/ordercreated.event'
import CustomerChanged from '../../Events/customerchanged.event'

export default class Order extends AggregateRoot {


    constructor(id, date, customerId) {
        super()
        this.type = this.constructor.name
        this.id = id
        this.date = null
        this.customerId = null
        if (id) {            
            super.applyChange(new OrderCreated(id, date, customerId), { child: this })
        }                    
    }

    apply(event) {
        switch (event.constructor.name) {
            case 'OrderCreated' : {
                this.id = event.id
                this.date = event.date
                this.customerId = event.customerId
                break
            }
            case 'CustomerChanged': {
                this.customerId = event.customerId
                break
            }
        }
    }

    changeCustomer(customerId){        
        super.applyChange(new CustomerChanged(this.id, customerId), {child: this})               
    }
}

