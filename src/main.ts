import { div, fragment, ul } from '@dolanske/cascade'
import { ref } from '@vue/reactivity'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import type { FormattedEvent } from './types'
import { INPUT_FORMAT, formatEventData } from './time'
import { CountdownItem } from './components/CountdownItem'
import { Sidebar } from './components/Sidebar'
import { getEvents } from './data'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.extend(duration)

// Fetch just once on load
const events = await getEvents() ?? []

const formattedEvents = ref<FormattedEvent[]>(formatEventData(
  events
    .filter(item => dayjs().isBefore(dayjs(item.date, INPUT_FORMAT)))
    .sort((a, b) => dayjs(a.date, INPUT_FORMAT).isBefore(dayjs(b.date, INPUT_FORMAT)) ? -1 : 1),
))

// One time use component for logic extraction
const Countdown = ul().setup(async (ctx) => {
  // Get the square root of the event count, to more evenly distrubute them
  // across the viewport
  const columns = Math.min(3, Math.ceil(Math.sqrt(events.length)))
  ctx.style({ 'grid-template-columns': `repeat(${columns}, 1fr)` })

  // Update time until all the events every second
  const intervalHandler = setInterval(() => {
    formattedEvents.value = formatEventData(formattedEvents.value)
  }, 1000)

  // Render items
  ctx.for(formattedEvents, (event) => {
    return CountdownItem().props(event)
  })

  // Dispose of the interval when application is closed
  ctx.onDestroy(() => clearInterval(intervalHandler))
})

const App = fragment([
  Countdown,
  div(
    Sidebar.props({
      upcomingCount: formattedEvents.value.length,
      // pastCount: events.length - formattedEvents.value.length,
    }),
  ).class('sidebar-wrap'),
])

App.mount('#app')
