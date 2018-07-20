import express from 'express'

import cors from './src/config/cors'
import FakeBus from './src/fakeBus'
import EventStore from './src/eventStore/eventStore'
import Repository from './src/eventStore/repository'
import EventHandler from './src/readModel/eventHandler'
import BullShitDatabase from './src/readModel/readModelFacade'

import CreateOrderCommand from './src/commands/order/createOrderCommand'
import ChangeCustomerCommand from './src/commands/order/changeCustomerCommand'

import CreateOrderCommandHandler from './src/commandHandlers/order/createOrderCommandHandler'
import ChangeCustomerCommandHandler from './src/commandHandlers/order/changeCustomerCommandHandler'

const srv = express()
const port = 3005
const database = new BullShitDatabase()
const eventHandler = new EventHandler(database)
const bus = new FakeBus(eventHandler)
const storage = new EventStore(bus)
const repository = new Repository(storage)

//Registering CommandsHandlers
bus.registerHandler(new CreateOrderCommandHandler(repository))
bus.registerHandler(new ChangeCustomerCommandHandler(repository))

srv.use(express.urlencoded({ extended: true }))
srv.use(express.json())
srv.use(cors)

srv.get('/', (req, res) => {
    res.send('Welcome to API')
})

srv.listen(port, () => {
    console.log(`BACKEND  ir running on port ${port}.`)
})

srv.get('/api/orders/', (req, res, next) => {
    res.send(database.getOrders())
})

srv.post('/api/orders/', (req, res) => {
    const command = new CreateOrderCommand(0, req.body.date, req.body.customerId)
    bus.send(command)
    res.send(storage.current)
})

srv.get('/api/orders/:id', (req, res) => {
    res.send(database.getOrder(req.params.id))
})

srv.put('/api/orders/:id', (req, res) => {
    const command = new ChangeCustomerCommand(req.params.id, req.body.customerId)
    bus.send(command)
    res.send(storage.current)
    // res.send({
    //     id: req.params.id,
    //     customerId: req.body.customerId
    // })
})
