const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async create(order) {
    const newOrder = await models.Order.create(order);
    return newOrder;
  }

  async find() {
    return await models.Order.findAll({
      include: ['customer']
    });
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    if(!order) {
      throw boom.notFound('order not found');
    }
    return order;
  }

  async update(id, orderChanges) {
    const orderFinded = await this.findOne(id);
    return await orderFinded.update(orderChanges);
  }

  async delete(id) {
    const orderFinded = await this.findOne(id);
    await orderFinded.destroy();
    return {id};
  }
}

module.exports = OrderService;
