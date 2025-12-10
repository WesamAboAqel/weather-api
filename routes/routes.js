import express from "express";
import { getCache, getWeather, rateLimiter } from "../controllers/controllers.js";
import { validateDates } from "../middleware/validateDates.js";

const router = express.Router();

router.get("/:country/:date1/:date2", rateLimiter, validateDates, getCache, getWeather);

router.get("/:country", rateLimiter, getCache, getWeather);

export default router;
