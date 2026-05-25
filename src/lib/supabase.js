import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ftkhxtefrtelxquoaugo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0a2h4dGVmcnRlbHhxdW9hdWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2OTU1MTksImV4cCI6MjA5NTI3MTUxOX0.-UDULZNteJ5SCPDe7BQ2tyIftOzCVVd0gs6WlHSi0G0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
