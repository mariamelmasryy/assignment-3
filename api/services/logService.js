const winston = require('winston');
const { format } = require('winston');
require('winston-kafka-connect');
const {
  combine,
  timestamp,
  json,
  colorize,
  prettyPrint
} = format;
const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
};

class Logger {
  constructor () {
    winston.addColors(customLevels.colors);
    this.errorLogger = winston.createLogger({
      levels: customLevels.levels,
      transports: [
        new winston.transports.Console(),
        new winston.transports.WinstonKafkaTransport({
          level: 'info',
          format: combine(
            colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            json(),
            prettyPrint(),
          ),
          meta: {},
          kafkaClient: {
            kafkaHost: process.env.KAFKA_USERNAME,
            clientId: 'winston-kafka-logger'
          },
          topic: 'winston-logs',
          name: 'WinstonKafkaLogger',
          timestamp: function () {

            return Date.now();
          },
          formatter: JSON.stringify,
          defaultMeta: { serviceId: 'crudService', environment: process.env.NODE_ENV },
          exitOnError: false,
        })
      ]
    });
    this.errorLogger.on('error', (err) => console.log('error', err));
  }

  logToKafka (req) {
    const logData = {
      endPoint: `${req.method.toUpperCase()} ${req.url.path}`,
      body: req.orig.payload || '',
      query: req.orig .query || '',
      params: req.orig.params || '',
      responseStatusCode: req.response.statusCode,
      response: req.response.source,
      ip: req.info.remoteAddress,
      userAgent: req.headers['User-Agent'] || '',
      requestId: req.info.id,
      receivedAt: req.info.received,
      respondedAt: req.info.responded,
    };

    return this.errorLogger.error('', logData);
  }
}

module.exports = new Logger();
