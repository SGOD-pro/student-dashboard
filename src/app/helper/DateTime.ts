export function monthsDifference(
	date1: Date | string,
	date2: Date | string
): number {
	const startDate = new Date(date1 < date2 ? date1 : date2);
	const endDate = new Date(date1 < date2 ? date2 : date1);
	console.log(date1, date2);

	const startYear = startDate.getFullYear();
	const startMonth = startDate.getMonth();
	const startDay = startDate.getDate();
	const endYear = endDate.getFullYear();
	const endMonth = endDate.getMonth();
	const endDay = endDate.getDate();

	let yearDiff = endYear - startYear;
	let monthDiff = endMonth - startMonth;

	if (endDay < startDay) {
		monthDiff -= 1;
	}

	const totalMonths = yearDiff * 12 + monthDiff;
	console.log(totalMonths);
	return totalMonths < 0 ? 0 : totalMonths;
}
export function parseDateDMY(dateString: string|undefined): Date {
    if (!dateString) {
        return new Date();
    }
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}