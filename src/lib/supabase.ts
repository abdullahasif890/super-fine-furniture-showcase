
import { createClient } from '@supabase/supabase-js';

// Use the Supabase client from the integration
const supabaseUrl = "https://mzjurcpcnituhpucrizb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16anVyY3Bjbml0dWhwdWNyaXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTAyNjEsImV4cCI6MjA2MDIyNjI2MX0.85RKqoJcyJjv8LcM9kPrCCVo40d3c4SG_guOa6Z6R20";

// Create the Supabase client with proper auth configuration
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

export { supabase };
