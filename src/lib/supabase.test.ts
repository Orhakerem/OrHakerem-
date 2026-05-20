import assert from 'node:assert/strict';
import test from 'node:test';

type SupabaseTestEnvName =
  | 'SUPABASE_URL'
  | 'SUPABASE_ANON_KEY'
  | 'NEXT_PUBLIC_SUPABASE_URL'
  | 'NEXT_PUBLIC_SUPABASE_ANON_KEY';

type SupabaseTestEnv = Partial<Record<SupabaseTestEnvName, string>>;

function withSupabaseEnv(env: SupabaseTestEnv) {
  return async (callback: () => Promise<void>) => {
    const previousEnv = {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    };

    for (const key of Object.keys(previousEnv) as SupabaseTestEnvName[]) {
      const value = env[key];

      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }

    try {
      await callback();
    } finally {
      for (const [key, value] of Object.entries(previousEnv)) {
        if (value === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = value;
        }
      }
    }
  };
}

test('prefers server Supabase environment variables over legacy public variables', async () => {
  await withSupabaseEnv({
    SUPABASE_URL: 'https://server.supabase.co',
    SUPABASE_ANON_KEY: 'server-anon-key',
    NEXT_PUBLIC_SUPABASE_URL: 'https://public.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'public-anon-key',
  })(async () => {
    const supabaseModule = await import(`./supabase.ts?server-env-${Date.now()}`);
    const env = (supabaseModule as {
      resolveSupabaseEnv: () => { url: string; anonKey: string };
    }).resolveSupabaseEnv();

    assert.deepEqual(env, {
      url: 'https://server.supabase.co',
      anonKey: 'server-anon-key',
    });
  });
});

test('falls back to legacy public Supabase variables for local compatibility', async () => {
  await withSupabaseEnv({
    SUPABASE_URL: undefined,
    SUPABASE_ANON_KEY: undefined,
    NEXT_PUBLIC_SUPABASE_URL: 'https://public.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'public-anon-key',
  })(async () => {
    const supabaseModule = await import(`./supabase.ts?public-env-${Date.now()}`);
    const env = (supabaseModule as {
      resolveSupabaseEnv: () => { url: string; anonKey: string };
    }).resolveSupabaseEnv();

    assert.deepEqual(env, {
      url: 'https://public.supabase.co',
      anonKey: 'public-anon-key',
    });
  });
});
