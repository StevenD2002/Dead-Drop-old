import dateFormat from "dateformat"

export function formatDate(timestamp) {
	let date = new Date(timestamp)
	// @TODO Actually compute the date properly...
	let dateStr = dateFormat(date, "h:MM tt")
	return `Today at ${dateStr}`
}
