const Inert = require('@hapi/inert');
const Vision = require('vision');

const plugins = [Inert, Vision];

module.exports = (server) => server.register(plugins);
