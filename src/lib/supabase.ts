
import { createClient } from '@supabase/supabase-js';

// Get environment variables or use fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a Supabase client only if credentials are available
let supabase: ReturnType<typeof createClient> | null = null;

try {
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Supabase client initialized successfully');
  } else {
    console.warn('Supabase credentials not available - functionality will be limited');
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
}

export { supabase };
