#CQRS + Event Source + DDD


 [![Coverage Status][coveralls-image]][coveralls-url]


This application is a test, a case of study.
It is based on Gregory Young CQRS Simple (https://github.com/gregoryyoung/m-r).

##What is this?

This a API based on express.js that aim to store the generated events in a local memory event store. That is all events are deleted when the application is restarted.

We use a billing sample. You can create orders, view orders and change cutomers.

The API is hosted in 3005 port and has four methods:

### GET /api/orders/

Return all created orders

### POST /api/orders

Create a new order

### GET /api/orders/:id

Return a specific order by id


### PUT /api/orders/:id

Update the customerId on a specific order by id

##Forward

This project still under construction, so there are so much to do. In this list include: code refactoring, message bus and more.

[coveralls-image]: https://coveralls.io/repos/andrepraeiro/billing/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/andrepraeiro/billing?branch=master