const { Kafka } = require('kafkajs');

class KafkaMessageBroker {
  constructor () {
    const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env;
    const sasl = username && password ? { username, password, mechanism: 'plain' } : null;
    const ssl = !!sasl;

    this.kafkaInstance = new Kafka({
      clientId: 'winston-kafka-logger',
      brokers: [username],
      ssl,
      sasl
    });
  }

  async instantiateTopics (topic) {
    try {
      const admin = this.kafkaInstance.admin();
      await admin.connect();
      await admin.createTopics({
        topics: [{ topic }],
        waitForLeaders: true,
      });
    }
    catch (error) {
      console.error('error', error);
    }
  }

  async consumeLoggingMessages () {
    const consumer = this.kafkaInstance.consumer({ groupId: 'winston-kafka-consumer' });
    try {
      await consumer.connect();

      await consumer.subscribe({
        topic: 'winston-logs',
        fromBeginning: true
      });

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log('Received message', {
            topic,
            partition,
            value: message.value.toString()
          });
        }
      });
    }
    catch (error) {
      await consumer.disconnect();
      console.error('Failed to gracefully disconnect consumer', error);
    }
  }
}

(async () => {
  try {
    const sss = new KafkaMessageBroker();
    await sss.instantiateTopics('winston-logs');
    await sss.consumeLoggingMessages();
  }
  catch (error) {
    console.log('error', error);
  }
})();
