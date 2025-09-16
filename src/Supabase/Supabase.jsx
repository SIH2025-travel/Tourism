import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://YOUR-PROJECT.supabase.co";
const supabaseAnonKey = "YOUR-ANON-KEY";  // from Supabase dashboard

export const supabase = createClient(supabaseUrl, supabaseAnonKey);