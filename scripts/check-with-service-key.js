// Script to check Supabase with service key (bypasses RLS)
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Use service key to bypass RLS

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials!');
  console.error('URL:', supabaseUrl ? 'set' : 'missing');
  console.error('Service Key:', supabaseServiceKey ? 'set' : 'missing');
  process.exit(1);
}

console.log('Using SERVICE KEY to bypass RLS policies...\n');
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkData() {
  console.log('Checking Supabase connection...\n');

  // Check lectures
  console.log('=== Checking lectures table ===');
  const { data: lectures, error: lecturesError } = await supabase
    .from('lectures')
    .select('*', { count: 'exact' })
    .limit(5);

  if (lecturesError) {
    console.error('Error:', lecturesError);
  } else {
    console.log(`✅ Found ${lectures?.length || 0} lectures`);
    if (lectures && lectures.length > 0) {
      console.log('Sample lecture:', JSON.stringify(lectures[0], null, 2));
    }
  }

  // Check transcript_segments
  console.log('\n=== Checking transcript_segments table ===');
  const { data: segments, error: segmentsError } = await supabase
    .from('transcript_segments')
    .select('*', { count: 'exact' })
    .limit(5);

  if (segmentsError) {
    console.error('Error:', segmentsError);
  } else {
    console.log(`✅ Found segments (showing first 5)`);
    if (segments && segments.length > 0) {
      console.log('Sample segment:', JSON.stringify(segments[0], null, 2));
    }
  }

  // Check text_insights
  console.log('\n=== Checking text_insights table ===');
  const { data: insights, error: insightsError } = await supabase
    .from('text_insights')
    .select('*', { count: 'exact' })
    .limit(5);

  if (insightsError) {
    console.error('Error:', insightsError);
  } else {
    console.log(`✅ Found insights`);
    if (insights && insights.length > 0) {
      console.log('Sample insight:', JSON.stringify(insights[0], null, 2));
    }
  }

  // Check lecture_texts
  console.log('\n=== Checking lecture_texts table ===');
  const { data: texts, error: textsError } = await supabase
    .from('lecture_texts')
    .select('*', { count: 'exact' })
    .limit(1);

  if (textsError) {
    console.error('Error:', textsError);
  } else {
    console.log(`✅ Found lecture texts`);
    if (texts && texts.length > 0) {
      console.log('Has data');
    }
  }
}

checkData().then(() => {
  console.log('\n✅ Check complete');
  process.exit(0);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
