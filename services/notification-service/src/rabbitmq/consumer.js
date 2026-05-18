import {
  getChannel,
} from "./connection.js";

import Notification from
"../models/notification.model.js";

const consumeEvents =
  async () => {

    try {

      const channel =
        getChannel();

      const exchange =
        "blog_exchange";

      const queue =
        "notification_blog_queue";

      await channel.assertExchange(

        exchange,

        "topic",

        {
          durable: true,
        }

      );

      await channel.assertQueue(
        queue
      );

      await channel.bindQueue(

        queue,

        exchange,

        "blog.created"

      );

      console.log(
        "Waiting for blog events..."
      );

      channel.consume(

        queue,

        async (message) => {

          const data =
            JSON.parse(
              message.content.toString()
            );

          console.log(
            "Blog Event Received"
          );

          await Notification.create({

            type:
              "BLOG_CREATED",

            userId:
              data.authorId,

            message:
              `New blog created: ${data.title}`,

          });

          channel.ack(message);

        }

      );

    } catch (error) {

      console.log(
        error.message
      );

    }

  };

export default consumeEvents;