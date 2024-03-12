// lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_API_KEY || '';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export { supabase };
