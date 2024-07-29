import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'

export const supabase = createClient<Database>(
  'https://camqocmuyolpjjbnbcha.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhbXFvY211eW9scGpqYm5iY2hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwMTkxNDQsImV4cCI6MjAzMDU5NTE0NH0.QmtBbAOfQ4usos4zQHih6nqesf5HQBYD1e7ujpsanqI',
)

export async function getEvents() {
  const { data } = await supabase.from('events').select()
  return data
}
