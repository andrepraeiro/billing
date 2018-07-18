import express from 'express'
import bodyParser from 'body-parser'
import cors from './src/config/cors'

const srv = express()
const port = 3005
srv.use(bodyParser.urlencoded({ extended: true }))
srv.use(bodyParser.json())
srv.use(cors)

srv.get('/', (req, res) => {
    res.send('Welcome to API')
})

srv.listen(port, () => {
    console.log(`BACKEND  ir running on port ${port}.`)
})