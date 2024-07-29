import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'
import type { FormattedEvent } from './types'

export const supabase = createClient<Database>(
  'https://camqocmuyolpjjbnbcha.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhbXFvY211eW9scGpqYm5iY2hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwMTkxNDQsImV4cCI6MjAzMDU5NTE0NH0.QmtBbAOfQ4usos4zQHih6nqesf5HQBYD1e7ujpsanqI',
)

export async function getEvents() {
  const { data } = await supabase.from('events').select()
  return data
}

export const FAKE_EVENT_TITLE = 'fake-event-identifier'

export function createFakeEvent(id: number): FormattedEvent {
  return {
    created_at: '',
    created_by: null,
    date: '',
    description: '',
    id: id + 99999999,
    link: null,
    location: null,
    markdown: null,
    modified_at: null,
    modified_by: null,
    note: null,
    title: FAKE_EVENT_TITLE,
    displayDate: '',
    untilDate: '',
    untilTime: '',
  }
}
