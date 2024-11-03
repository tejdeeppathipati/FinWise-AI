// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY must be provided in the .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

