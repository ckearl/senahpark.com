// Script to check what tables exist in Supabase
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('Checking all tables in Supabase...\n');

  const tables = [
    'lectures',
    'speakers',
    'transcript_segments',
    'lecture_text',
    'lecture_texts',  // Check both singular and plural
    'text_insights'
  ];

  for (const table of tables) {
    console.log(`\n=== Checking ${table} table ===`);

    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: false })
        .limit(1);

      if (error) {
        console.log(`❌ Error: ${error.message}`);
      } else {
        console.log(`✅ Table exists with ${count || 0} rows`);
        if (data && data.length > 0) {
          console.log('Sample row:', JSON.stringify(data[0], null, 2));
        }
      }
    } catch (err) {
      console.log(`❌ Exception: ${err.message}`);
    }
  }
}

checkTables().then(() => {
  console.log('\n✅ Check complete');
  process.exit(0);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
