import { div, fragment, h2, h3, img, p, reusable, span, strong, ul } from '@dolanske/cascade'
import { ref } from '@vue/reactivity'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import type { FormattedEvent } from './events'
import { events } from './events'
import { INPUT_FORMAT, formatEventData } from './time'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.extend(duration)

const CountdownItem = reusable('li', (ctx, props: FormattedEvent) => {
  ctx.nest([
    h3(props.name),
    p(props.description).if(props.description),
    div().class('divider'),
    span(props.displayDate).class('date'),
    div([
      strong(props.untilDate),
      span(props.untilTime),
    ]).class('countdown'),
  ])
})

const Countdown = ul().setup((ctx) => {
  // Get the square root of the event count, to more evenly distrubute them
  // across the viewport
  const columns = Math.min(3, Math.ceil(Math.sqrt(events.length)))
  ctx.style({ 'grid-template-columns': `repeat(${columns}, 1fr)` })

  // Preformat events to contain the `until` property which is derived from the
  // event date
  const formattedEvents = ref<FormattedEvent[]>(formatEventData(
    events
      .filter(item => dayjs(item.date, INPUT_FORMAT).diff(dayjs()) > 0)
      .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)) > 0 ? 1 : -1),
  ))

  // Update time until all the events every second
  const intervalHandler = setInterval(() => {
    formattedEvents.value = formatEventData(formattedEvents.value)
  }, 1000)

  // Render
  ctx.for(formattedEvents, (event) => {
    return CountdownItem().props(event)
  })

  // Dispose of the interval when application is closed
  ctx.onDestroy(() => clearInterval(intervalHandler))
})

const Sidebar = div().setup((ctx) => {
  ctx.class('sidebar')
  ctx.nest([
    img().attr('src', '/logo.svg'),
    h2([
      span('Hivecom'),
      strong('Countdown'),
    ]),
    p().html(`Collection of upcoming events in the hivecom community. If you want your event added, please <a href="https://github.com/Mavulp/countdown/issues/new?assignees=dolanske&labels=&projects=&template=new-event.md&title=%5BRequest%5D+New+event" tarrget="_blank">create an issue</a>. <br /><br /> Designed and implemented by dolanske on Wednesday, in 2024.`),
  ])
})

const App = fragment().nest([
  Countdown,
  div(
    Sidebar,
  ).class('sidebar-wrap'),
])

App.mount('#app')
