const path = require('path');
const dataSchema = require('./schemas/dataSchema.js');
const dataController = require('./controllers/dataController');

module.exports = [
  {
    path: '/data',
    method: 'GET',
    handler: dataController.find,
    options: {
      description: 'list all data',
      auth: false,
    }
  },
  {
    path: '/data/{id}',
    method: 'get',
    handler: dataController.findOne,
    options: {
      description: 'get specific data by its id',
      auth: false
    }
  },
  {
    path: '/data',
    method: 'POST',
    handler: dataController.create,
    options: {
      payload: {
        allow: [
          'application/json'
        ],
      },
      description: 'create new data',
      auth: false,
      validate: dataSchema.createSchema,
    }
  },
  {
    path: '/data/{id}',
    method: 'put',
    handler: dataController.update,
    options: {
      payload: {
        allow: [
          'application/json'
        ],
      },
      description: 'update specific data by its id',
      auth: false,
      validate: dataSchema.updateSchema,
    }
  },
  {
    path: '/data/{id}',
    method: 'delete',
    handler: dataController.delete,
    options: {
      description: 'delete specific data by its id',
      auth: false,
    }
  },
];
