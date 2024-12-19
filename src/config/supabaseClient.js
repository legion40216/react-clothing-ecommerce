
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bntzueinmkjqprcmidvl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJudHp1ZWlubWtqcXByY21pZHZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUxMjg1MDgsImV4cCI6MTk4MDcwNDUwOH0.7QYhzzRsFw6BQsazL3Lcba5PTtmZkzJC4xKxnnSp874'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase