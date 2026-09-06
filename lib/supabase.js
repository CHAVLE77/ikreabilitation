import { createClient } from "@supabase/supabase-js";

let supabaseInstance = null;

export async function getSupabase() {
  if (supabaseInstance) return supabaseInstance;
  supabaseInstance = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  return supabaseInstance;
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);