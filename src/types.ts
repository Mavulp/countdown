import type { Database } from '../types/supabase'

export type EventItem = Database['public']['Tables']['events']['Row']

export type FormattedEvent = EventItem & {
  displayDate: string
  untilDate: string
  untilTime: string
}
