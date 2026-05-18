import amqp from "amqplib";

let channel;

const connectRabbitMQ =
  async () => {

    try {

      const connection =
        await amqp.connect(
          process.env.RABBITMQ_URL
        );

      channel =
        await connection.createChannel();

      console.log(
        "RabbitMQ Connected"
      );

    } catch (error) {

      console.log(
        error.message
      );

    }

  };

export const getChannel = () => {
  return channel;
};

export default connectRabbitMQ;