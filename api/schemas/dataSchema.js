const Joi = require('joi');

module.exports = {
  createSchema: {
    payload: Joi.object({
      id: Joi.number().required(),
      name: Joi.string().min(3).max(50).required(),
      type: Joi.string().allow('cafe', 'restaurant', 'fastFood').required()
    })
  },
  updateSchema: {
    payload: Joi.object({
      id: Joi.number().required(),
      name: Joi.string().min(3).max(50).required(),
      type: Joi.string().allow('cafe', 'restaurant', 'fastFood').required()
    })
  }
};
