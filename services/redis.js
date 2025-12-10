import redis from "redis";

const client = redis.createClient({
	socket: {
		port: process.env.REDIS_PORT,
		host: process.env.REDIS_HOST
	}
});

export default client;
