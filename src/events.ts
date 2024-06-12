export interface CountdownEvent {
  name: string
  description?: string
  date: string
  location: string
}

export type FormattedEvent = CountdownEvent & {
  displayDate: string
  untilDate: string
  untilTime: string
}

export const events: CountdownEvent[] = [
  {
    name: 'Steinö',
    description: 'Relaxing meetup in Sweden. We\'ll walk around, climb indoors & outdoors and have fun all week!',
    date: '02-07-2024',
    location: 'Malmö, Sweden',
  },
  {
    name: 'Amon Tattoo',
    description: 'Dolan is getting Amon tattoo',
    date: '05-07-2024',
    location: 'Malmö, Sweden',
  },
  {
    name: 'Beforegervidda',
    description: 'Pre-hardangervidda hangout in Helsinki. Lotsa climbing and beer involved.',
    date: '15-07-2024',
    location: 'Helsinki, Finland',
  },
  {
    name: 'Hardangervidda 2024',
    description: 'Bike Mike pt2. We lost last year, but that\'s not happening this time.',
    date: '20-07-2024',
    location: 'Hardangervidda, Norway',
  },
  {
    name: 'Kurwa meetup',
    description: 'We all go to poland to eat vegab.',
    date: '12-10-2024',
    location: 'Krakow, Poland',
  },
  {
    name: 'Goodbye tmtu',
    description: 'Felix is enlisting into military training. Godspeed',
    date: '01-01-2025',
    location: 'Sweden',
  },
  {
    name: 'Christmas!',
    description: 'We jolly',
    date: '24-12-2024',
    location: 'North Pole',
  },
]
