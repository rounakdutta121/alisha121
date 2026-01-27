
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const supabaseUrl = 'https://omzpoqykmwqprjhnhzma.supabase.co';
const supabaseAnonKey = 'sb_publishable_x7BYtFAozIushnR7c0CUHA_86qsVUcD';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
