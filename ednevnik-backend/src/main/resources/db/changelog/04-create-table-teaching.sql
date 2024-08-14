CREATE TABLE IF NOT EXISTS public.teaching (
    teaching_id serial NOT NULL,
    professor_id integer NOT NULL,
    school_class_id integer NOT NULL,
    PRIMARY KEY (teaching_id),
    FOREIGN KEY (professor_id) REFERENCES public.professor (professor_id),
    FOREIGN KEY (school_class_id) REFERENCES public.school_class (school_class_id)
    );