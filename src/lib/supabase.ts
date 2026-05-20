import { createClient } from '@supabase/supabase-js';

import {
  MissingSupabaseEnvError,
  type SupabaseEnvName,
} from './pricing-errors';

interface SupabaseEnv {
  url: string;
  anonKey: string;
}

function getOptionalEnv(name: SupabaseEnvName, env: NodeJS.ProcessEnv) {
  return env[name]?.trim() || null;
}

function getRequiredEnv(name: SupabaseEnvName, env: NodeJS.ProcessEnv) {
  const value = getOptionalEnv(name, env);

  if (!value) {
    throw new MissingSupabaseEnvError(name);
  }

  return value;
}

export function resolveSupabaseEnv(env: NodeJS.ProcessEnv = process.env): SupabaseEnv {
  const serverUrl = getOptionalEnv('SUPABASE_URL', env);
  const serverAnonKey = getOptionalEnv('SUPABASE_ANON_KEY', env);

  if (serverUrl || serverAnonKey) {
    return {
      url: serverUrl ?? getRequiredEnv('SUPABASE_URL', env),
      anonKey: serverAnonKey ?? getRequiredEnv('SUPABASE_ANON_KEY', env),
    };
  }

  return {
    url: getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL', env),
    anonKey: getRequiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', env),
  };
}

const { url: supabaseUrl, anonKey: supabaseAnonKey } = resolveSupabaseEnv();

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
