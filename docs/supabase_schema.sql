
-- 1) Profile table (optional - store display name, preferences)
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  created_at timestamp with time zone DEFAULT now()
);

-- 2) Trips table: store generated itinerary JSON and metadata
CREATE TABLE public.trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE SET NULL,
  destination text NOT NULL,
  budget integer NOT NULL,
  days integer NOT NULL DEFAULT 2,
  itinerary jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Policy: allow authenticated users to insert their own trips
CREATE POLICY "Allow insert for authenticated" ON public.trips
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Policy: allow users to select their own trips
CREATE POLICY "Select own trips" ON public.trips
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: allow update only by owner
CREATE POLICY "Modify own trips" ON public.trips
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: allow delete only by owner
CREATE POLICY "Delete own trips" ON public.trips
  FOR DELETE
  USING (auth.uid() = user_id);
