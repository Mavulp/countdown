import { button, div, h2, hr, img, p } from '@dolanske/cascade'
import { type Ref, computed } from '@vue/reactivity'
import type { FormattedEvent } from '../types'
import { FAKE_EVENT_TITLE } from '../data'

interface Props {
  formattedEvents: Ref<FormattedEvent[]>
}

// I don't feel like fixing my libraries rn so I'll do it the old fashioned way
function setActiveHash(e: any) {
  const upcoming = document.querySelector('#upcoming')
  const past = document.querySelector('#past')
  const id = e.target?.id

  if (id === 'upcoming') {
    upcoming?.classList.add('active')
    past?.classList.remove('active')
  }
  else if (id === 'past') {
    upcoming?.classList.remove('active')
    past?.classList.add('active')
  }

  window.location.hash = id
}

export const Sidebar = div().setup((ctx, props: Props) => {
  const upcomingEventsString = computed(() =>
    `${props.formattedEvents.value.filter(e => e.title !== FAKE_EVENT_TITLE).length} events`,
  )

  ctx.class('sidebar')
  ctx.nest([
    img().attr('src', 'https://mavulp.github.io/countdown/logo.svg'),
    h2('Hivecom \n countdown'),
    p(upcomingEventsString),
    hr(),
    button('Upcoming')
      .class({ active: ['#upcoming', ''].includes(window.location.hash) })
      .id('upcoming')
      .click(setActiveHash),
    button('Past')
      .class({ active: window.location.hash === '#past' })
      .id('past')
      .click(setActiveHash),
    div().style('flex', 1),
    p().html(`Collection of upcoming events in the hivecom community. If you want your event added, please <a href="https://github.com/Mavulp/countdown/issues/new?assignees=dolanske&labels=&projects=&template=new-event.md&title=%5BRequest%5D+New+event" tarrget="_blank">create an issue</a>. <br /><br /> Designed and implemented by dolanske on Wednesday, in 2024.`),
    hr(),
    p().html('Copyright @ <a href="https://github.com/Mavulp" target="_blank">Mavulp</a> 2024'),
  ])
})
