import colors from "colors";
colors.enable();

// @desc    Formats Starting and Ending Dates so API can understand user input
export const formatAPIDate = (date1, date2) => {
	if (!date1 && !date2) return { startDate: null, endDate: null };

	const firstDate = new Date(date1);
	const secondDate = new Date(date2);
	// console.log(firstDate, secondDate);

	const startDate = `${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-${firstDate.getDate()}`;
	const endDate = `${secondDate.getFullYear()}-${secondDate.getMonth() + 1}-${secondDate.getDate()}`;

	return { startDate, endDate };
};
