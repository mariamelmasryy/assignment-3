const path = require('path');
const Boom = require('@hapi/boom');
const { StatusCodes } = require('http-status-codes');

const models = require(path.join(__dirname, '../models/index'));
const dataRepository = require('../repositories/data');


module.exports = {
  find: async function (request, reply) {
    try {
      const data = await dataRepository.listData(request.query);
      console.log("Response is hereeeeee");
      return reply.response(data).code(StatusCodes.PARTIAL_CONTENT);
    }
    catch (e) {
      console.log(e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  findOne: async function (request, reply) {
    try {
      const data = await dataRepository.findTheDataById(request.params.id);

      if(!data) {

        return Boom.notFound('This data not found');
      }

      return reply.response(data).code(StatusCodes.OK);
    }
    catch (e) {

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  create: async function (request, reply) {
    try {
      const { payload } = request;
      const data = await dataRepository.createNewData(payload);

      return reply.response(data).code(StatusCodes.CREATED);
    }
    catch (e) {

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  update: async function (request, reply) {
    const transaction = await models.sequelize.transaction();
    try {
      const { payload } = request;

      const data = await dataRepository.findTheDataById(request.params.id, transaction);

      if(!data) {
        await transaction.rollback();

        return Boom.notFound('The data You Try To Update Not Exist');
      }

      await dataRepository.updateTheDataById(request.params.id, payload, transaction);
      await transaction.commit();

      return reply.response().code(StatusCodes.NO_CONTENT);
    }
    catch (e) {

      if(transaction) {

        await transaction.rollback();
      }

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  delete: async function (request, reply) {
    try {
      const numberOfDestroyedRows = await dataRepository.deleteTheDataById(request.params.id);

      if(!numberOfDestroyedRows) {

        return Boom.notFound('The data You Try To Delete Not Exist');
      }

      return reply.response().code(StatusCodes.NO_CONTENT);
    }
    catch (e) {

      return Boom.badImplementation('An internal server error occurred');
    }
  }
};
