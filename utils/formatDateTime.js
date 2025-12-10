import colors from "colors";
colors.enable();

export const formatDateTime = (date = new Date()) => {
	return `[${date.toISOString().replace("T", " ").split(".")[0]}]`["blue"];
};
