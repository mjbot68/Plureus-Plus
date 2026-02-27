-- 002_single_timestamp_voting_responses
-- Keep only created_at; drop submitted_at and client_time.

ALTER TABLE public.voting_responses
  DROP COLUMN IF EXISTS submitted_at,
  DROP COLUMN IF EXISTS client_time;
