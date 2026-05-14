import { createClient } from '@supabase/supabase-js';

import {
  MissingSupabaseEnvError,
  type SupabasePublicEnvName,
} from './pricing-errors';

function getRequiredPublicEnv(name: SupabasePublicEnvName) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new MissingSupabaseEnvError(name);
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
