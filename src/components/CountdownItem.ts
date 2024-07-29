import { div, h3, p, reusable, span, strong } from '@dolanske/cascade'
import type { FormattedEvent } from '../types'

export const CountdownItem = reusable('li', (ctx, props: FormattedEvent) => {
  ctx.nest([
    h3(props.title),
    p(props.description).if(props.description),
    div().class('divider'),
    span(props.displayDate).class('date'),
    div([
      strong(props.untilDate),
      span(props.untilTime),
    ]).class('countdown'),
  ])
})
