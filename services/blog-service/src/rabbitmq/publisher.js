import {
  getChannel,
} from "./connection.js";

const publishEvent = async (
  exchange,
  routingKey,
  message
) => {

  try {

    const channel =
      getChannel();

    await channel.assertExchange(
      exchange,
      "topic",
      {
        durable: true,
      }
    );

    channel.publish(
      exchange,
      routingKey,
      Buffer.from(
        JSON.stringify(message)
      )
    );

    console.log(
      `Event Published: ${routingKey}`
    );

  } catch (error) {

    console.log(
      error.message
    );

  }

};

export default publishEvent;