-- Create newsletter signups table
CREATE TABLE public.newsletter_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact form submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create membership signups table
CREATE TABLE public.membership_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  membership_type TEXT NOT NULL,
  favorite_genres TEXT,
  how_did_you_hear TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.newsletter_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_signups ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public forms, no auth required)
CREATE POLICY "Allow anonymous newsletter signups" ON public.newsletter_signups FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous contact submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous membership signups" ON public.membership_signups FOR INSERT WITH CHECK (true);