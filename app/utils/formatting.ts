import dateFormat from "dateformat"

export function formatDate(timestamp) {
  let date = new Date(timestamp)
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const day = date.getDay()
  // @TODO Actually compute the date properly...
  let dateStr = dateFormat(date, "h:MM tt")
  return `${days[day]} at ${dateStr}`
}
