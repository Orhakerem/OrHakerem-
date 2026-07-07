import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

type SupabaseAdminKeySource = 'SUPABASE_SECRET_KEY' | 'SUPABASE_SERVICE_ROLE_KEY';
type SupabaseAdminUrlSource = 'SUPABASE_URL' | 'NEXT_PUBLIC_SUPABASE_URL';
type SupabaseAdminEnvName = SupabaseAdminKeySource | SupabaseAdminUrlSource;

interface SupabaseAdminEnv {
  url: string;
  adminKey: string;
  keySource: SupabaseAdminKeySource;
  urlSource: SupabaseAdminUrlSource;
}

export class MissingSupabaseAdminEnvError extends Error {
  readonly code = 'missing_supabase_admin_env';

  constructor(readonly envName: SupabaseAdminEnvName) {
    super(`Missing ${envName}`);
    this.name = 'MissingSupabaseAdminEnvError';
  }
}

let cachedClient: SupabaseClient | null = null;
let cachedClientKey: string | null = null;

function getOptionalEnv(name: SupabaseAdminEnvName, env: NodeJS.ProcessEnv) {
  return env[name]?.trim() || null;
}

function getRequiredUrl(env: NodeJS.ProcessEnv) {
  const serverUrl = getOptionalEnv('SUPABASE_URL', env);

  if (serverUrl) {
    return {
      url: serverUrl,
      urlSource: 'SUPABASE_URL' as const,
    };
  }

  const publicUrl = getOptionalEnv('NEXT_PUBLIC_SUPABASE_URL', env);

  if (publicUrl) {
    return {
      url: publicUrl,
      urlSource: 'NEXT_PUBLIC_SUPABASE_URL' as const,
    };
  }

  throw new MissingSupabaseAdminEnvError('SUPABASE_URL');
}

function getRequiredAdminKey(env: NodeJS.ProcessEnv) {
  const secretKey = getOptionalEnv('SUPABASE_SECRET_KEY', env);

  if (secretKey) {
    return {
      adminKey: secretKey,
      keySource: 'SUPABASE_SECRET_KEY' as const,
    };
  }

  const serviceRoleKey = getOptionalEnv('SUPABASE_SERVICE_ROLE_KEY', env);

  if (serviceRoleKey) {
    return {
      adminKey: serviceRoleKey,
      keySource: 'SUPABASE_SERVICE_ROLE_KEY' as const,
    };
  }

  throw new MissingSupabaseAdminEnvError('SUPABASE_SECRET_KEY');
}

export function resolveSupabaseAdminEnv(
  env: NodeJS.ProcessEnv = process.env,
): SupabaseAdminEnv {
  return {
    ...getRequiredUrl(env),
    ...getRequiredAdminKey(env),
  };
}

export function getSupabaseAdminClient() {
  const { url, adminKey } = resolveSupabaseAdminEnv();
  const clientKey = `${url}:${adminKey}`;

  if (!cachedClient || cachedClientKey !== clientKey) {
    cachedClient = createClient(url, adminKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
    cachedClientKey = clientKey;
  }

  return cachedClient;
}
