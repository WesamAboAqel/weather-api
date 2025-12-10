import { formatDateTime } from "../utils/formatDateTime.js";
import client from "../services/redis.js";
import { formatAPIDate } from "../utils/formatAPIDate.js";

// @desc    Getting Weather Data for a specific Country.
// @route   GET /*
// @access  Public
export const getWeather = async (request, response, next) => {
	try {
		const { country, date1, date2 } = request.params;

		const { startDate, endDate } = formatAPIDate(date1, date2);

		let url;

		if (startDate && endDate) {
			url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/${startDate}/${endDate}?unitGroup=metric&key=${process.env.WEATHER_API}&include=days`;
		} else {
			url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}?unitGroup=metric&key=${process.env.WEATHER_API}&include=days`;
		}

		const rawData = await fetch(url);

		if (!rawData.ok) {
			const errorMessage = await rawData.text();
			throw new Error(errorMessage);
		}

		const data = await rawData.json();

		let cacheKey = `weather:${country}`;
		if (startDate && endDate) {
			cacheKey += "::" + startDate + ":" + endDate;
		}

		await client.set(cacheKey, JSON.stringify(data), { EX: 3600 });

		return response.status(200).json(data);
	} catch (error) {
		next(error);
	}
};

// @desc    Caching Weather Data for a Specific Country.
// @route   GET /*
// @access  Public
export const getCache = async (request, response, next) => {
	try {
		const { country, date1, date2 } = request.params;

		const { startDate, endDate } = formatAPIDate(date1, date2);

		let cacheKey = `weather:${country}`;

		if (startDate && endDate) {
			cacheKey += "::" + startDate + ":" + endDate;
		}

		const stringData = await client.get(cacheKey);

		if (stringData) {
			const data = JSON.parse(stringData);
			console.log(formatDateTime(), ` Found in Cache`["magenta"]);
			return response.status(200).json(data);
		} else {
			next();
		}
	} catch (error) {
		next(error);
	}
};

// @desc    Rate Limiting Service
// @route   GET /*
// @access  Public
export const rateLimiter = async (request, response, next) => {
	const cacheKey = `rate-limiter:${request.ip}`;
	const count = await client.incr(cacheKey);

	if (count === 1) {
		await client.expire(cacheKey, 60);
	}
	const delay = await client.ttl(cacheKey);

	if (count > 10) {
		return response.status(429).json({ msg: `You hit the rate limit, try again in ${delay} seconds` });
	}

	return next();
};
