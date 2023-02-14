const express = require('express');
const ProductsService= require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {

  createProductSchem,
  updateProductSchema,
  getProducSchema,

} = require('./../schemas/product.schema');
const router = express.Router();

const service = new ProductsService();

router.get('/', async (req, res) => {

  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('im a filter');
})


router.get('/:id', validatorHandler(getProducSchema, 'params'), async (req, res, next) => {

  try {

    const { id } = req.params;
    const product = await service.findOne(id);

    res.json(product);

  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createProductSchem, 'body'),
  async (req, res) => {

    const body = req.body;
    const newProduct = await service.create(body);

    res.status(201).json(newProduct);

});

router.patch('/:id',
  validatorHandler(getProducSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {

    try {

      const { id } = req.params;
      const body = req.body;
      const updatedProduct = await service.update(id, body)

      res.json(updatedProduct);

    } catch (error) {

      next(error);

    }

});

router.delete('/:id', async (req, res) => {

  const { id } = req.params;
  const updatedId = await service.delete(id);

  res.json(updatedId);
});

module.exports = router;
