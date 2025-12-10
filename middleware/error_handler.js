import colors from "colors";
import { formatDateTime } from "../utils/formatDateTime.js";
colors.enable();

// function formatDateTime(date = new Date()) {
//   return `[${date.toISOString().replace("T", " ").split(".")[0]}]`["blue"];
// }

export const errorHandler = (error, request, response, next) => {
	if (error) {
		console.error(formatDateTime(), ` Error: ${error.message}`["red"]);
		return response.status(500).json({ error: error.message });
	}
};

export default errorHandler;
