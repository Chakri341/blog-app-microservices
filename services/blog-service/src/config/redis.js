import redis from "redis";

let redisClient;

const connectRedis =
  async () => {

    try {

      redisClient =
        redis.createClient({

          url:
            process.env.REDIS_URL,

        });

      redisClient.on(
        "error",
        (err) => {

          console.log(
            "Redis Error:",
            err.message
          );

        }
      );

      await redisClient.connect();

      console.log(
        "Redis Connected"
      );

    } catch (error) {

      console.log(
        error.message
      );

    }

  };

export const getRedisClient =
  () => {

    return redisClient;

  };

export default connectRedis;