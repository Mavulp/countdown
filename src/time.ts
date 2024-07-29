import dayjs from 'dayjs'
import type { EventItem, FormattedEvent } from './types'

// Specify the date input format
export const INPUT_FORMAT = 'YYYY-MM-DD'

export function formatDateUntil(date: string) {
  return `in ${dayjs(date, INPUT_FORMAT).diff(dayjs(), 'days')} days`
}

export function formatTimeUntil() {
  const hours = dayjs().endOf('day').diff(dayjs(), 'hours')
  const minutes = dayjs().endOf('hour').diff(dayjs(), 'minutes')
  const seconds = dayjs().endOf('minute').diff(dayjs(), 'seconds')
  return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
}

export function formatDisplayDate(date: string) {
  return dayjs(date, INPUT_FORMAT).format('dddd, DD MMMM YYYY')
}

export function formatEventData(events: Array<FormattedEvent | EventItem>): FormattedEvent[] {
  return events.map((event) => {
    return {
      ...event,
      displayDate: formatDisplayDate(event.date),
      untilDate: formatDateUntil(event.date),
      untilTime: formatTimeUntil(),
    }
  })
}
