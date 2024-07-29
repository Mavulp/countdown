import dayjs from 'dayjs'
import type { EventItem, FormattedEvent } from './types'
import { FAKE_EVENT_TITLE, createFakeEvent } from './data'

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
  events = events.filter(e => e.title !== FAKE_EVENT_TITLE)

  const data = events.map((event) => {
    return {
      ...event,
      displayDate: formatDisplayDate(event.date),
      untilDate: formatDateUntil(event.date),
      untilTime: formatTimeUntil(),
    }
  })

  // Pad events to always fill the screen
  const clientWidth = document.documentElement.clientWidth

  if (clientWidth >= 1280) {
    // Desktop, needs a 9x9 grid
    for (let i = data.length; i < 9; i++) {
      data.push(createFakeEvent(i))
    }
  }
  else if (clientWidth < 1280 && clientWidth >= 888) {
    // Tablet, needs 2x6 grid
    for (let i = data.length; i < 6; i++) {
      data.push(createFakeEvent(i))
    }
  }

  return data
}
