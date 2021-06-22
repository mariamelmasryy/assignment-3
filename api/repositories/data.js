const path = require('path');
const { Op } = require('sequelize');
const { data: dataModel } = require(path.join(__dirname, '../models/index'));

module.exports = {
  listData: (filters) => {
    const query = {};

    if(filters.type) {
      query.type = { [Op.eq]: filters.type };
    }

    if(filters.name) {
      query.name = { [Op.like]: `%${filters.name}%` };
    }

    return dataModel.findAll({ where: query, raw: true });
  },

  findTheDataById: (dataId, transaction) =>
      dataModel.findOne({ where: { id: { [Op.eq]: dataId } }, raw: true }, { transaction }),

  createNewData: async (dataInfo) => {
    const data = await dataModel.create(dataInfo);

    return data.toJSON();
  },

  updateTheDataById: (dataId, dataUpdateInfo, transaction) =>
      dataModel.update(dataUpdateInfo, { where: { id: { [Op.eq]: dataId } } },
          { transaction }),

  deleteTheDataById: (dataId) => dataModel.destroy({ where: { id: { [Op.eq]: dataId } } })
};
