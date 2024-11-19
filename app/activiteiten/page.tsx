import { createClient } from '@/utils/supabase/server';

export default async function Activiteiten() {
  const supabase = await createClient();
  const { data: activiteiten } = await supabase.from("activiteiten").select();

  return <pre>{JSON.stringify(activiteiten, null, 5)}</pre>
}