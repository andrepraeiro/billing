import express from 'express'
import cors from './src/config/cors'
import CreateOrderCommand from './src/commands/order/createOrderCommand'
import FakeBus from './src/fakeBus'
import EventStore from './src/eventStore/eventStore'
import Repository from './src/eventStore/repository'
import CreateOrderCommandHandler from './src/commandHandlers/order/createOrderCommandHandler'
import EventHandler from './src/readModel/eventHandler'
import BullShitDatabase from './src/readModel/readModelFacade'

import Observable from './src/observerPattern/observable'

const srv = express()
const port = 3005
const database = new BullShitDatabase()
const eventHandler = new EventHandler(database)
const bus = new FakeBus(eventHandler)
const storage = new EventStore(bus)
const repository = new Repository(storage)
const handler = new CreateOrderCommandHandler(repository)
srv.use(express.urlencoded({ extended: true }))
srv.use(express.json())
srv.use(cors)

srv.get('/', (req, res) => {
    res.send('Welcome to API')
})

srv.listen(port, () => {
    console.log(`BACKEND  ir running on port ${port}.`)
})

srv.get('/api/order/', (req, res, next) => {
    res.send(db.getOrders())
})

srv.post('/api/order/', (req, res) => {
    const command = new CreateOrderCommand(0, req.body.date, req.body.customerId)
    bus.registerHandler(handler)
    bus.send(command)
    res.send(storage.current)
})

srv.get('/obs', (req, res) => {
    const observer = new Observable()
    const s = new Subs()
    observer.subscribe(s)
    observer.notify('data')
    res.send('conclude')
})

class Subs {
    notificate(data) {}
}
