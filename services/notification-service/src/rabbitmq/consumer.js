// import {
//   getChannel,
// } from "./connection.js";

// import Notification from
// "../models/notification.model.js";

// const consumeEvents =
//   async () => {

//     try {

//       const channel =
//         getChannel();

//       const exchange =
//         "blog_exchange";

//       const queue =
//         "notification_blog_queue";

//       await channel.assertExchange(

//         exchange,

//         "topic",

//         {
//           durable: true,
//         }

//       );

//       await channel.assertQueue(
//         queue
//       );

//       await channel.bindQueue(

//         queue,

//         exchange,

//         "blog.created"

//       );

//       console.log(
//         "Waiting for blog events..."
//       );

//       channel.consume(

//         queue,

//         async (message) => {

//           const data =
//             JSON.parse(
//               message.content.toString()
//             );

//           console.log(
//             "Blog Event Received"
//           );

//           await Notification.create({

//             type:
//               "BLOG_CREATED",

//             userId:
//               data.authorId,

//             message:
//               `New blog created: ${data.title}`,

//           });

//           channel.ack(message);

//         }

//       );

//     } catch (error) {

//       console.log(
//         error.message
//       );

//     }

//   };

// export default consumeEvents;

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

      // BLOG EVENTS

      const blogExchange =
        "blog_exchange";

      const blogQueue =
        "notification_blog_queue";

      await channel.assertExchange(

        blogExchange,

        "topic",

        {
          durable: true,
        }

      );

      await channel.assertQueue(
        blogQueue
      );

      await channel.bindQueue(

        blogQueue,

        blogExchange,

        "blog.created"

      );

      // COMMENT EVENTS

      const commentExchange =
        "comment_exchange";

      const commentQueue =
        "notification_comment_queue";

      await channel.assertExchange(

        commentExchange,

        "topic",

        {
          durable: true,
        }

      );

      await channel.assertQueue(
        commentQueue
      );

      await channel.bindQueue(

        commentQueue,

        commentExchange,

        "comment.created"

      );

      console.log(
        "Waiting for events..."
      );

      // BLOG CONSUMER

      channel.consume(

        blogQueue,

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

      // COMMENT CONSUMER

      channel.consume(

        commentQueue,

        async (message) => {

          const data =
            JSON.parse(
              message.content.toString()
            );

          console.log(
            "Comment Event Received"
          );

          await Notification.create({

            type:
              "COMMENT_CREATED",

            userId:
              data.userId,

            message:
              `New comment added to blog ${data.blogId}`,

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