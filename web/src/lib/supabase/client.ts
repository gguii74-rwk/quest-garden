"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { requireSupabasePublicEnv } from "./env";

let browserClient: SupabaseClient<Database> | null = null;

export function createSupabaseBrowserClient() {
  if (browserClient) return browserClient;

  const env = requireSupabasePublicEnv();
  browserClient = createBrowserClient<Database>(env.url, env.anonKey);

  return browserClient;
}
