import { div, h2, img, p, span, strong } from '@dolanske/cascade'

export const Sidebar = div().setup((ctx) => {
  ctx.class('sidebar')
  ctx.nest([
    img().attr('src', 'https://mavulp.github.io/countdown/logo.svg'),
    h2([
      span('Hivecom'),
      strong('Countdown'),
    ]),
    p().html(`Collection of upcoming events in the hivecom community. If you want your event added, please <a href="https://github.com/Mavulp/countdown/issues/new?assignees=dolanske&labels=&projects=&template=new-event.md&title=%5BRequest%5D+New+event" tarrget="_blank">create an issue</a>. <br /><br /> Designed and implemented by dolanske on Wednesday, in 2024.`),
  ])
})
