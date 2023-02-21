const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const userRouter = require('./user.router');
const customersRouter = require('./customers.router');
const orderRoute = require('./order.route');
const express = require('express');

// const userRouter = require('./user.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', userRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', orderRoute);
}

module.exports = routerApi;
