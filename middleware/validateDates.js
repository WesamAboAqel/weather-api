// @desc    Validate Starting and Ending Dates
// @route   GET /api/weather/:country/
// @access  Public
export const validateDates = (request, response, next) => {
	const { date1, date2 } = request.params;

	if (date1 && isNaN(Date.parse(date1))) {
		throw new Error("Invalid Starting Date Format. Use MM-DD-YYYY");
	}

	if (date2 && isNaN(Date.parse(date2))) {
		throw new Error("Invalid Ending Date Format. Use MM-DD-YYYY");
	}

	next();
};
