import express from "express";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error_handler.js";
import colors from "colors";
import client from "./services/redis.js";
import routes from "./routes/routes.js";
colors.enable();

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

const app = express();

app.use(logger);

app.use("/api/weather", routes);

app.use(errorHandler);

app.listen(port, host, async () => {
	await client.connect();

	console.log("Server is listening on port 3000 !");
});
