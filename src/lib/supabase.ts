import { createClient } from '@supabase/supabase-js';

type SupabasePublicEnvName =
  | 'NEXT_PUBLIC_SUPABASE_URL'
  | 'NEXT_PUBLIC_SUPABASE_ANON_KEY';

function getRequiredPublicEnv(name: SupabasePublicEnvName) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}

const supabaseUrl = getRequiredPublicEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseAnonKey = getRequiredPublicEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
