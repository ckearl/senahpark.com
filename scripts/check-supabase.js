// Script to check Supabase connection and data
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
  console.log('Checking Supabase connection...\n');
  console.log('URL:', supabaseUrl);

  // Check lectures
  console.log('\n=== Checking lectures table ===');
  const { data: lectures, error: lecturesError } = await supabase
    .from('lectures')
    .select('*');

  if (lecturesError) {
    console.error('Error fetching lectures:', lecturesError);
  } else {
    console.log(`Found ${lectures?.length || 0} lectures`);
    if (lectures && lectures.length > 0) {
      console.log('First lecture:', lectures[0]);
    }
  }

  // Check transcript_segments
  console.log('\n=== Checking transcript_segments table ===');
  const { data: segments, error: segmentsError } = await supabase
    .from('transcript_segments')
    .select('*')
    .limit(5);

  if (segmentsError) {
    console.error('Error fetching segments:', segmentsError);
  } else {
    console.log(`Found ${segments?.length || 0} segments (showing first 5)`);
    if (segments && segments.length > 0) {
      console.log('First segment:', segments[0]);
    }
  }

  // Check text_insights
  console.log('\n=== Checking text_insights table ===');
  const { data: insights, error: insightsError } = await supabase
    .from('text_insights')
    .select('*');

  if (insightsError) {
    console.error('Error fetching insights:', insightsError);
  } else {
    console.log(`Found ${insights?.length || 0} insights`);
    if (insights && insights.length > 0) {
      console.log('First insight:', insights[0]);
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
