-- 001_create_voting_responses_table
-- Stores one row per submission: timestamp, stack_id, answers (JSONB).

CREATE TABLE IF NOT EXISTS public.voting_responses (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_at  timestamptz NOT NULL DEFAULT now(),
  client_time   text,
  stack_id      text NOT NULL,
  answers       jsonb NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.voting_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role full access to voting_responses"
  ON public.voting_responses
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
