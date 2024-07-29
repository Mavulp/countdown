import { div, fragment, li, ul } from '@dolanske/cascade'
import { ref } from '@vue/reactivity'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import type { EventItem, FormattedEvent } from './types'
import { INPUT_FORMAT, formatEventData } from './time'
import { CountdownItem } from './components/CountdownItem'
import { Sidebar } from './components/Sidebar'
import { getEvents } from './data'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.extend(duration)

let events: Array<FormattedEvent | EventItem> = []

getEvents()
  .then((data) => {
    // Initially sort dataset
    events = data ?? []
    sortAndFormatDataset()
  })

const formattedEvents = ref<FormattedEvent[]>([])

// ----------------------------------------------------------------------------
function sortAndFormatDataset() {
  switch (window.location.hash) {
    case '#past': {
      formattedEvents.value = formatEventData(
        events
          .filter(item => dayjs().isAfter(dayjs(item.date, INPUT_FORMAT)))
          .sort((a, b) => dayjs(a.date, INPUT_FORMAT).isAfter(dayjs(b.date, INPUT_FORMAT)) ? -1 : 1),
      )
      break
    }

    case '#upcoming':
    default: {
      formattedEvents.value = formatEventData(
        events
          .filter(item => dayjs().isBefore(dayjs(item.date, INPUT_FORMAT)))
          .sort((a, b) => dayjs(a.date, INPUT_FORMAT).isBefore(dayjs(b.date, INPUT_FORMAT)) ? -1 : 1),
      )
      break
    }
  }
}

// Watch for hash changes and sort again
window.addEventListener('hashchange', sortAndFormatDataset)

// ----------------------------------------------------------------------------
// Recalculate fillter items when page resizes
let prevSize = 0
window.addEventListener('resize', () => {
  // I can't be arsed to optimize this, but at least we won't resize when it's
  // not needed on phone & desktop
  if (prevSize <= 1280 && prevSize >= 512) {
    formattedEvents.value = formatEventData(formattedEvents.value)
  }
  prevSize = document.documentElement.clientWidth
})

// ----------------------------------------------------------------------------
// One time use component for logic extraction
const Countdown = ul().setup(async (ctx) => {
  // Update time until all the events every second
  const intervalHandler = setInterval(() => {
    formattedEvents.value = formatEventData(formattedEvents.value)
  }, 1000)

  // Render items
  ctx.for(formattedEvents, (event) => {
    if (event.title === 'fake-event-identifier')
      return li('').class('filler')

    return CountdownItem().props(event)
  })

  // Dispose of the interval when application is closed
  ctx.onDestroy(() => clearInterval(intervalHandler))
})

const App = fragment([
  Countdown,
  div(
    Sidebar.props({ formattedEvents }),
  ).class('sidebar-wrap'),
])

App.mount('#app')
