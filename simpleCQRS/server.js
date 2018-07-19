import express from 'express'
import bodyParser from 'body-parser'
import cors from './src/config/cors'
import BullShitDatabase from './src/readModel/readModelFacade'
import CreateOrderCommand from './src/commands/order/createOrderCommand'
import FakeBus from './src/fakeBus'
import EventStore  from './src/eventStore/eventStore'
import Repository  from './src/eventStore/repository'
import CreateOrderCommandHandler from './src/commandHandlers/order/createOrderCommandHandler'


const srv = express()
const port = 3005
const db = new BullShitDatabase()
const bus = new FakeBus()
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
    const storage = new EventStore(bus)
    const repository = new Repository(storage)
    const commands = new CreateOrderCommandHandler(repository)    
    bus.registerHandler(commands)
    bus.send(command)
    res.send('inserido com sucesso!')
})
