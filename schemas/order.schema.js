const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();

const createOrder = Joi.object({
  customerId: customerId.required(),
});

const getOrderById = Joi.object({
  id: id.required(),
});

module.exports = {
  createOrder,
  getOrderById,
}
