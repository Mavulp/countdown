import { div, fragment, ul } from '@dolanske/cascade'
import { ref } from '@vue/reactivity'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import type { FormattedEvent } from './events'
import { events } from './events'
import { INPUT_FORMAT, formatEventData } from './time'
import { CountdownItem } from './components/CountdownItem'
import { Sidebar } from './components/Sidebar'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.extend(duration)

// One time use component for logic extraction
const Countdown = ul().setup((ctx) => {
// Get the square root of the event count, to more evenly distrubute them
  // across the viewport
  const columns = Math.min(3, Math.ceil(Math.sqrt(events.length)))
  ctx.style({ 'grid-template-columns': `repeat(${columns}, 1fr)` })

  // Preformat events to include the countdown values
  const formattedEvents = ref<FormattedEvent[]>(formatEventData(
    // Deploying to github pages creates a static file which is served to all
    // users. So when a user visits the page, the array would get sorted. Next
    // user would re-sort it again. By creating a shallow copy we should
    // hopefully prevent this from happening
    [...events]
      .filter(item => dayjs().isBefore(dayjs(item.date, INPUT_FORMAT)))
      .sort((a, b) => dayjs(a.date, INPUT_FORMAT).isBefore(dayjs(b.date, INPUT_FORMAT)) ? -1 : 1),
  ))

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
    Sidebar,
  ).class('sidebar-wrap'),
])

App.mount('#app')
