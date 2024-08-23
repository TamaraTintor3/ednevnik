ALTER TABLE public.school_calendar RENAME COLUMN date TO start_date;
ALTER TABLE public.school_calendar ADD COLUMN end_date DATE;