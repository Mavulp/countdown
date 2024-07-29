import { button, div, h2, hr, img, p } from '@dolanske/cascade'
import { type Ref, ref } from '@vue/reactivity'
import type { FormattedEvent } from '../types'

interface Props {
  formattedEvents: Ref<FormattedEvent[]>
}

// I don't feel like fixing my libraries rn so I'll do it the old fashioned way
function setActiveHash(e: any) {
  const upcoming = document.querySelector('#upcoming')
  const past = document.querySelector('#previous')
  const id = e.target?.id

  if (id === 'upcoming') {
    upcoming?.classList.add('active')
    past?.classList.remove('active')
  }
  else if (id === 'previous') {
    upcoming?.classList.remove('active')
    past?.classList.add('active')
  }

  window.location.hash = id
}

export const Sidebar = div().setup((ctx, props: Props) => {
  ctx.class('sidebar')
  ctx.nest([
    img().attr('src', 'https://mavulp.github.io/countdown/logo.svg'),
    h2('Hivecom \n countdown'),
    p(`${props.formattedEvents.value.length} upcoming`),
    hr(),
    button('Upcoming Events')
      .class({ active: ['#upcoming', ''].includes(window.location.hash) })
      .id('upcoming')
      .click(setActiveHash),
    button('Previous')
      .class({ active: window.location.hash === '#previous' })
      .id('previous')
      .click(setActiveHash),
    div().style('flex', 1),
    p().html(`Collection of upcoming events in the hivecom community. If you want your event added, please <a href="https://github.com/Mavulp/countdown/issues/new?assignees=dolanske&labels=&projects=&template=new-event.md&title=%5BRequest%5D+New+event" tarrget="_blank">create an issue</a>. <br /><br /> Designed and implemented by dolanske on Wednesday, in 2024.`),
    hr(),
    p().html('Copyright @ <a href="https://github.com/Mavulp" target="_blank">Mavulp</a> 2024'),
  ])
})
