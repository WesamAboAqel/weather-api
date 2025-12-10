import colors from "colors";
import { formatDateTime } from "../utils/formatDateTime.js";

colors.enable();

const logger = (request, response, next) => {
	const methodColors = {
		GET: "green",
		POST: "blue",
		PUT: "yellow",
		DELETE: "red"
	};

	const color = methodColors[request.method] || "white";

	console.log(
		formatDateTime(),
		` ${request.method} ${request.protocol}://${request.get("host")}${request.originalUrl}`[color]
	);
	next();
};

export default logger;
