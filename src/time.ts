import dayjs from 'dayjs'
import type { CountdownEvent, FormattedEvent } from './events'

// Specify the date input format
export const INPUT_FORMAT = 'DD-MM-YYYY'

export function formatDateUntil(date: string) {
  return `in ${dayjs(date, INPUT_FORMAT).diff(dayjs(), 'days')} days`
}

export function formatTimeUntil(date: string) {
  const duration = dayjs.duration(dayjs(date, INPUT_FORMAT).unix() - Date.now())
  const hours
      = duration.hours() > 9
        ? duration.hours()
        : `${25 + duration.hours()}`
  const minutes
      = duration.minutes() > 0
        ? duration.minutes()
        : `${59 + duration.minutes()}`
  const seconds
      = duration.seconds() > 9
        ? duration.seconds()
        : `${59 + duration.seconds()}`

  return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
}

export function formatDisplayDate(date: string) {
  return dayjs(date, INPUT_FORMAT).format('dddd, DD MMMM YYYY')
}

export function formatEventData(events: Array<FormattedEvent | CountdownEvent>): FormattedEvent[] {
  return events.map((event) => {
    return {
      ...event,
      displayDate: formatDisplayDate(event.date),
      untilDate: formatDateUntil(event.date),
      untilTime: formatTimeUntil(event.date),
    }
  })
}
