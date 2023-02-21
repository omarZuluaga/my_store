const express = require('express');
const router = express.Router();
const CategoriesService = require('./../services/category.service');
const {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} = require('./../schemas/category.schema');
const validatorHandler = require('../middlewares/validator.handler');

const categoriesService = new CategoriesService();

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newCategory = categoriesService.create(body);

    res.status(201).json(newCategory);
});1

router.get('/', async (req, res, next) => {
  try {
    const categories = await categoriesService.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'parms'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await categoriesService.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  });

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const body  = req.body;
      const categoryUpdated = await categoriesService.update(id, body);
      res.json(categoryUpdated)
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      await categoriesService.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
