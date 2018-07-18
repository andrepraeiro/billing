const port  = 3005

const bodyParser = require('body-parser')
const express  = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')
const BullShitDatabase =  require('../../lib/readModel/readModelFacade')

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(allowCors)



server.get('/', function(req, res){
    res.send('Welcome to API')
})

// Lista de Utilizadores
var users = [
    { id: 1, username: 'Manuel', email: 'manuel@examplo.com' },
    { id: 2, username: 'Maria', email: 'maria@examplo.com' }
  ];


server.get('/api/users/', function(req, res, next) {
    res.send(users)
})

server.get('/api/order/', function(req, res, next){
    const db = BullShitDatabase
    console.log(db.getOrders())
    res.send(BullShitDatabase)
    next()
})

server.listen(port,function() {
    console.log(`BACKEND  ir running on port ${port}.`)
})

module.exports = server