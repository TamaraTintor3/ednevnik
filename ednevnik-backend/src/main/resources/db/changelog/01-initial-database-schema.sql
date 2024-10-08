-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public."user"
(
    user_id serial NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    email character varying NOT NULL,
    role character varying NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS public.school_class
(
    school_class_id serial NOT NULL,
    name character varying NOT NULL,
    school_year_id integer NOT NULL,
    PRIMARY KEY (school_class_id)
);

CREATE TABLE IF NOT EXISTS public.student
(
    student_id serial NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    jmbg character varying NOT NULL,
    school_class_id integer NOT NULL,
    parent_id integer,
    PRIMARY KEY (student_id)
);

CREATE TABLE IF NOT EXISTS public.absence
(
    absence_id serial NOT NULL,
    student_id integer NOT NULL,
    date_of_absence date NOT NULL,
    reason character varying,
    number_of_classes integer NOT NULL,
    approved boolean,
    PRIMARY KEY (absence_id)
);

CREATE TABLE IF NOT EXISTS public.subject
(
    subject_id serial NOT NULL,
    name character varying NOT NULL,
    professor_id integer NOT NULL,
    PRIMARY KEY (subject_id)
);

CREATE TABLE IF NOT EXISTS public.parent
(
    parent_id serial NOT NULL,
    user_id integer NOT NULL,
    PRIMARY KEY (parent_id)
);

CREATE TABLE IF NOT EXISTS public.professor
(
    professor_id serial NOT NULL,
    user_id integer NOT NULL,
    class_professor boolean NOT NULL DEFAULT false,
    school_class_id integer,
    PRIMARY KEY (professor_id)
);

CREATE TABLE IF NOT EXISTS public.subject_grades
(
    subject_grades_id serial NOT NULL,
    subject_id integer NOT NULL,
    student_id integer NOT NULL,
    date date NOT NULL,
    grade integer NOT NULL,
    description character varying,
    school_year_id integer,
    final_subject_grade boolean DEFAULT false,
    PRIMARY KEY (subject_grades_id)
);

CREATE TABLE IF NOT EXISTS public.school_year
(
    school_year_id serial NOT NULL,
    year character varying NOT NULL,
    semester integer,
    PRIMARY KEY (school_year_id)
);

CREATE TABLE IF NOT EXISTS public.message
(
    message_id serial NOT NULL,
    parent_id integer NOT NULL,
    professor_id integer NOT NULL,
    title character varying NOT NULL,
    text character varying NOT NULL,
    date date NOT NULL,
    PRIMARY KEY (message_id)
);

CREATE TABLE IF NOT EXISTS public.school_calendar
(
    school_calendar_id serial NOT NULL,
    description character varying NOT NULL,
    date date NOT NULL,
    professor_id integer NOT NULL,
    PRIMARY KEY (school_calendar_id)
);

CREATE TABLE IF NOT EXISTS public.class_schedule
(
    class_schedule_id serial NOT NULL,
    school_class_id integer NOT NULL,
    PRIMARY KEY (class_schedule_id)
);

CREATE TABLE IF NOT EXISTS public.schedule_subject
(
    schedule_subject_id serial NOT NULL,
    subject_id integer NOT NULL,
    class_schedule_id integer NOT NULL,
    subject_order integer NOT NULL,
    day character varying NOT NULL,
    PRIMARY KEY (schedule_subject_id)
);

CREATE TABLE IF NOT EXISTS public.student_class
(
    student_class_id serial NOT NULL,
    student_id integer NOT NULL,
    school_class_id integer NOT NULL,
    behavior character varying,
    final_grade double precision,
    PRIMARY KEY (student_class_id)
);

ALTER TABLE IF EXISTS public.school_class
    ADD FOREIGN KEY (school_year_id)
    REFERENCES public.school_year (school_year_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.student
    ADD FOREIGN KEY (school_class_id)
    REFERENCES public.school_class (school_class_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.student
    ADD FOREIGN KEY (parent_id)
    REFERENCES public.parent (parent_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.absence
    ADD FOREIGN KEY (student_id)
    REFERENCES public.student (student_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.subject
    ADD FOREIGN KEY (professor_id)
    REFERENCES public.professor (professor_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.parent
    ADD FOREIGN KEY (user_id)
    REFERENCES public."user" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.professor
    ADD FOREIGN KEY (user_id)
    REFERENCES public."user" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.professor
    ADD FOREIGN KEY (school_class_id)
    REFERENCES public.school_class (school_class_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.subject_grades
    ADD FOREIGN KEY (subject_id)
    REFERENCES public.subject (subject_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.subject_grades
    ADD FOREIGN KEY (student_id)
    REFERENCES public.student (student_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.subject_grades
    ADD FOREIGN KEY (school_year_id)
    REFERENCES public.school_year (school_year_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.message
    ADD FOREIGN KEY (parent_id)
    REFERENCES public.parent (parent_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.message
    ADD FOREIGN KEY (professor_id)
    REFERENCES public.professor (professor_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.school_calendar
    ADD FOREIGN KEY (professor_id)
    REFERENCES public.professor (professor_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.class_schedule
    ADD FOREIGN KEY (school_class_id)
    REFERENCES public.school_class (school_class_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.schedule_subject
    ADD FOREIGN KEY (subject_id)
    REFERENCES public.subject (subject_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.schedule_subject
    ADD FOREIGN KEY (class_schedule_id)
    REFERENCES public.class_schedule (class_schedule_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.student_class
    ADD FOREIGN KEY (student_id)
    REFERENCES public.student (student_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public.student_class
    ADD FOREIGN KEY (school_class_id)
    REFERENCES public.school_class (school_class_id) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;

END;