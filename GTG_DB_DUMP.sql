--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

-- Started on 2023-02-13 18:56:14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3455 (class 1262 OID 16398)
-- Name: Get_Test_Go_DB; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Get_Test_Go_DB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE "Get_Test_Go_DB" OWNER TO postgres;

\connect "Get_Test_Go_DB"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3456 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 237 (class 1255 OID 16492)
-- Name: add_assessment_mcq(character varying, text, text, text, text, text, text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.add_assessment_mcq(IN name_of_assessment character varying, IN mcq_question text, IN option_one text, IN option_two text, IN option_three text, IN option_four text, IN correct_answer text)
    LANGUAGE plpgsql
    AS $$
	begin
		insert into get_test_go_question(question_type, question) values(1, mcq_question);
		insert into get_test_go_assessment_question(assessment_id, question_id) 
			values((select assessment_id from get_test_go_assessment where assessment_name = name_of_assessment), (select question_id from get_test_go_question where question = mcq_question));
		insert into get_test_go_mcq_answer(question_id, option_one, option_two, option_three, option_four, correct_answer)
			values((select question_id from get_test_go_question where question = mcq_question), option_one, option_two, option_three, option_four, correct_answer);
		
		commit;
	end;
$$;


ALTER PROCEDURE public.add_assessment_mcq(IN name_of_assessment character varying, IN mcq_question text, IN option_one text, IN option_two text, IN option_three text, IN option_four text, IN correct_answer text) OWNER TO postgres;

--
-- TOC entry 238 (class 1255 OID 16493)
-- Name: add_assessment_true_false(character varying, text, boolean); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.add_assessment_true_false(IN name_of_assessment character varying, IN true_false_question text, IN answer boolean)
    LANGUAGE plpgsql
    AS $$
	begin
		insert into get_test_go_question(question_type, question) values(2, true_false_question);
		insert into get_test_go_assessment_question(assessment_id, question_id)
			values((select assessment_id from get_test_go_assessment where assessment_name = name_of_assessment), (select question_id from get_test_go_question where question = true_false_question));
		insert into get_test_go_true_false_answer(question_id, answer)
			values((select question_id from get_test_go_question where question = true_false_question), answer);
		
		commit;
	end;
$$;


ALTER PROCEDURE public.add_assessment_true_false(IN name_of_assessment character varying, IN true_false_question text, IN answer boolean) OWNER TO postgres;

--
-- TOC entry 239 (class 1255 OID 16494)
-- Name: assessment_question_exists(character varying, text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.assessment_question_exists(IN name_of_assessment character varying, IN question_text text)
    LANGUAGE plpgsql
    AS $$
	begin
		
				
		commit;
	end;
$$;


ALTER PROCEDURE public.assessment_question_exists(IN name_of_assessment character varying, IN question_text text) OWNER TO postgres;

--
-- TOC entry 241 (class 1255 OID 16551)
-- Name: bind_candidate_and_assessment(character varying, character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.bind_candidate_and_assessment(IN candidate_email character varying, IN name_of_assessment character varying)
    LANGUAGE plpgsql
    AS $$
	begin
		insert into get_test_go_candidate_assessment(candidate_id, assessment_id) 
			values((select recruiter_id from get_test_go_candidate where email = candidate_email), (select assessment_id from get_test_go_assessment where assessment_name = name_of_assessment));
		
		commit;
	end;
	
$$;


ALTER PROCEDURE public.bind_candidate_and_assessment(IN candidate_email character varying, IN name_of_assessment character varying) OWNER TO postgres;

--
-- TOC entry 240 (class 1255 OID 16550)
-- Name: bind_recruiter_and_assessment(character varying, character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.bind_recruiter_and_assessment(IN recruiter_email character varying, IN name_of_assessment character varying)
    LANGUAGE plpgsql
    AS $$
	begin
		insert into get_test_go_recruiter_assessment(recruiter_id, assessment_id) 
			values((select recruiter_id from get_test_go_recruiter where email = recruiter_email), (select assessment_id from get_test_go_assessment where assessment_name = name_of_assessment));
		
		commit;
	end;
	
$$;


ALTER PROCEDURE public.bind_recruiter_and_assessment(IN recruiter_email character varying, IN name_of_assessment character varying) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16411)
-- Name: get_test_go_assessment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.get_test_go_assessment (
    assessment_id integer NOT NULL,
    assessment_name character varying(100) NOT NULL,
    assessment_details text NOT NULL,
    assessment_type integer
);


ALTER TABLE public.get_test_go_assessment OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16410)
-- Name: get_test_go_assessment_assessment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.get_test_go_assessment_assessment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.get_test_go_assessment_assessment_id_seq OWNER TO postgres;

--
-- TOC entry 3457 (class 0 OID 0)
-- Dependencies: 216
-- Name: get_test_go_assessment_assessment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.get_test_go_assessment_assessment_id_seq OWNED BY public.get_test_go_assessment.assessment_id;


--
-- TOC entry 227 (class 1259 OID 16476)
-- Name: get_test_go_assessment_question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.get_test_go_assessment_question (
    assessment_question_id integer NOT NULL,
    assessment_id integer,
    question_id integer
);


ALTER TABLE public.get_test_go_assessment_question OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16475)
-- Name: get_test_go_assessment_question_assessment_question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.get_test_go_assessment_question_assessment_question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.get_test_go_assessment_question_assessment_question_id_seq OWNER TO postgres;

--
-- TOC entry 3458 (class 0 OID 0)
-- Dependencies: 226
-- Name: get_test_go_assessment_question_assessment_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.get_test_go_assessment_question_assessment_question_id_seq OWNED BY public.get_test_go_assessment_question.assessment_question_id;


--
-- TOC entry 215 (class 1259 OID 16400)
-- Name: get_test_go_assessment_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.get_test_go_assessment_type (
    assessment_type_id integer NOT NULL,
    assessment_type_name character varying(255) NOT NULL,
    assessment_type_details text NOT NULL
);


ALTER TABLE public.get_test_go_assessment_type OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16399)
-- Name: get_test_go_assessment_type_assessment_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.get_test_go_assessment_type_assessment_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.get_test_go_assessment_type_assessment_type_id_seq OWNER TO postgres;

--
-- TOC entry 3459 (class 0 OID 0)
-- Dependencies: 214
-- Name: get_test_go_assessment_type_assessment_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.get_test_go_assessment_type_assessment_type_id_seq OWNED BY public.get_test_go_assessment_type.assessment_type_id;


--
-- TOC entry 221 (class 1259 OID 16434)
-- Name: get_test_go_question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.get_test_go_question (
    question_id integer NOT NULL,
    question_type integer,
    question text NOT NULL
);


ALTER TABLE public.get_test_go_question OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16495)
-- Name: get_test_go_assessment_with_question; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.get_test_go_assessment_with_question AS
 SELECT get_test_go_assessment.assessment_id,
    get_test_go_assessment.assessment_name,
    get_test_go_question.question_id,
    get_test_go_question.question
   FROM ((public.get_test_go_assessment
     JOIN public.get_test_go_assessment_question ON ((get_test_go_assessment_question.assessment_id = get_test_go_assessment.assessment_id)))
     JOIN public.get_test_go_question ON ((get_test_go_assessment_question.question_id = get_test_go_question.question_id)));


ALTER TABLE public.get_test_go_assessment_with_question OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16514)
-- Name: get_test_go_candidate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.get_test_go_candidate (
    candidate_id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.get_test_go_candidate OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16537)
-- Name: get_test_go_candidate_assessment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.get_test_go_candidate_assessment (
    candidate_id integer,
    assessment_id integer
);


ALTER TABLE public.get_test_go_candidate_assessment OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16556)
-- Name: get_test_go_assessments_of_candidate; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.get_test_go_assessments_of_candidate AS
 SELECT get_test_go_candidate.candidate_id,
    get_test_go_candidate.email,
    get_test_go_assessment.assessment_id,
    get_test_go_assessment.assessment_name
   FROM ((public.get_test_go_candidate
     JOIN public.get_test_go_candidate_assessment ON ((get_test_go_candidate.candidate_id = get_test_go_candidate_assessment.candidate_id)))
     JOIN public.get_test_go_assessment ON ((get_test_go_candidate_assessment.assessment_id = get_test_go_assessment.assessment_id)));


ALTER TABLE public.get_test_go_assessments_of_candidate OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16503)
-- Name: get_test_go_recruiter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.get_test_go_recruiter (
    recruiter_id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.get_test_go_recruiter OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16524)
-- Name: get_test_go_recruiter_assessment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.get_test_go_recruiter_assessment (
    recruiter_id integer,
    assessment_id integer
);


ALTER TABLE public.get_test_go_recruiter_assessment OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16552)
-- Name: get_test_go_assessments_of_recruiter; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.get_test_go_assessments_of_recruiter AS
 SELECT get_test_go_recruiter.recruiter_id,
    get_test_go_recruiter.email,
    get_test_go_assessment.assessment_id,
    get_test_go_assessment.assessment_name,
    get_test_go_assessment.assessment_details
   FROM ((public.get_test_go_recruiter
     JOIN public.get_test_go_recruiter_assessment ON ((get_test_go_recruiter.recruiter_id = get_test_go_recruiter_assessment.recruiter_id)))
     JOIN public.get_test_go_assessment ON ((get_test_go_recruiter_assessment.assessment_id = get_test_go_assessment.assessment_id)));


ALTER TABLE public.get_test_go_assessments_of_recruiter OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16513)
-- Name: get_test_go_candidate_candidate_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.get_test_go_candidate_candidate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.get_test_go_candidate_candidate_id_seq OWNER TO postgres;

--
-- TOC entry 3460 (class 0 OID 0)
-- Dependencies: 231
-- Name: get_test_go_candidate_candidate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.get_test_go_candidate_candidate_id_seq OWNED BY public.get_test_go_candidate.candidate_id;


--
-- TOC entry 223 (class 1259 OID 16450)
-- Name: get_test_go_mcq_answer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.get_test_go_mcq_answer (
    mcq_id integer NOT NULL,
    question_id integer,
    option_one text NOT NULL,
    option_two text NOT NULL,
    option_three text NOT NULL,
    option_four text NOT NULL,
    correct_answer text NOT NULL
);


ALTER TABLE public.get_test_go_mcq_answer OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16449)
-- Name: get_test_go_mcq_answer_mcq_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.get_test_go_mcq_answer_mcq_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.get_test_go_mcq_answer_mcq_id_seq OWNER TO postgres;

--
-- TOC entry 3461 (class 0 OID 0)
-- Dependencies: 222
-- Name: get_test_go_mcq_answer_mcq_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.get_test_go_mcq_answer_mcq_id_seq OWNED BY public.get_test_go_mcq_answer.mcq_id;


--
-- TOC entry 220 (class 1259 OID 16433)
-- Name: get_test_go_question_question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.get_test_go_question_question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.get_test_go_question_question_id_seq OWNER TO postgres;

--
-- TOC entry 3462 (class 0 OID 0)
-- Dependencies: 220
-- Name: get_test_go_question_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.get_test_go_question_question_id_seq OWNED BY public.get_test_go_question.question_id;


--
-- TOC entry 219 (class 1259 OID 16427)
-- Name: get_test_go_question_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.get_test_go_question_type (
    question_type_id integer NOT NULL,
    question_type_name character varying(100) NOT NULL
);


ALTER TABLE public.get_test_go_question_type OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16426)
-- Name: get_test_go_question_type_question_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.get_test_go_question_type_question_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.get_test_go_question_type_question_type_id_seq OWNER TO postgres;

--
-- TOC entry 3463 (class 0 OID 0)
-- Dependencies: 218
-- Name: get_test_go_question_type_question_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.get_test_go_question_type_question_type_id_seq OWNED BY public.get_test_go_question_type.question_type_id;


--
-- TOC entry 229 (class 1259 OID 16502)
-- Name: get_test_go_recruiter_recruiter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.get_test_go_recruiter_recruiter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.get_test_go_recruiter_recruiter_id_seq OWNER TO postgres;

--
-- TOC entry 3464 (class 0 OID 0)
-- Dependencies: 229
-- Name: get_test_go_recruiter_recruiter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.get_test_go_recruiter_recruiter_id_seq OWNED BY public.get_test_go_recruiter.recruiter_id;


--
-- TOC entry 225 (class 1259 OID 16464)
-- Name: get_test_go_true_false_answer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.get_test_go_true_false_answer (
    true_false_id integer NOT NULL,
    question_id integer,
    answer boolean NOT NULL
);


ALTER TABLE public.get_test_go_true_false_answer OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16463)
-- Name: get_test_go_true_false_answer_true_false_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.get_test_go_true_false_answer_true_false_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.get_test_go_true_false_answer_true_false_id_seq OWNER TO postgres;

--
-- TOC entry 3465 (class 0 OID 0)
-- Dependencies: 224
-- Name: get_test_go_true_false_answer_true_false_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.get_test_go_true_false_answer_true_false_id_seq OWNED BY public.get_test_go_true_false_answer.true_false_id;


--
-- TOC entry 3239 (class 2604 OID 16414)
-- Name: get_test_go_assessment assessment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_assessment ALTER COLUMN assessment_id SET DEFAULT nextval('public.get_test_go_assessment_assessment_id_seq'::regclass);


--
-- TOC entry 3244 (class 2604 OID 16479)
-- Name: get_test_go_assessment_question assessment_question_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_assessment_question ALTER COLUMN assessment_question_id SET DEFAULT nextval('public.get_test_go_assessment_question_assessment_question_id_seq'::regclass);


--
-- TOC entry 3238 (class 2604 OID 16403)
-- Name: get_test_go_assessment_type assessment_type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_assessment_type ALTER COLUMN assessment_type_id SET DEFAULT nextval('public.get_test_go_assessment_type_assessment_type_id_seq'::regclass);


--
-- TOC entry 3246 (class 2604 OID 16517)
-- Name: get_test_go_candidate candidate_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_candidate ALTER COLUMN candidate_id SET DEFAULT nextval('public.get_test_go_candidate_candidate_id_seq'::regclass);


--
-- TOC entry 3242 (class 2604 OID 16453)
-- Name: get_test_go_mcq_answer mcq_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_mcq_answer ALTER COLUMN mcq_id SET DEFAULT nextval('public.get_test_go_mcq_answer_mcq_id_seq'::regclass);


--
-- TOC entry 3241 (class 2604 OID 16437)
-- Name: get_test_go_question question_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_question ALTER COLUMN question_id SET DEFAULT nextval('public.get_test_go_question_question_id_seq'::regclass);


--
-- TOC entry 3240 (class 2604 OID 16430)
-- Name: get_test_go_question_type question_type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_question_type ALTER COLUMN question_type_id SET DEFAULT nextval('public.get_test_go_question_type_question_type_id_seq'::regclass);


--
-- TOC entry 3245 (class 2604 OID 16506)
-- Name: get_test_go_recruiter recruiter_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_recruiter ALTER COLUMN recruiter_id SET DEFAULT nextval('public.get_test_go_recruiter_recruiter_id_seq'::regclass);


--
-- TOC entry 3243 (class 2604 OID 16467)
-- Name: get_test_go_true_false_answer true_false_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_true_false_answer ALTER COLUMN true_false_id SET DEFAULT nextval('public.get_test_go_true_false_answer_true_false_id_seq'::regclass);


--
-- TOC entry 3433 (class 0 OID 16411)
-- Dependencies: 217
-- Data for Name: get_test_go_assessment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.get_test_go_assessment (assessment_id, assessment_name, assessment_details, assessment_type) FROM stdin;
3	Java Assessment	Checks your java skills	2
5	Python Assessment	Tests you python skills	2
6	C# Assessment	This assessment tests your c-sharp skills by asking diverse set of questions.	2
7	GoLang	This assessment tests your golang skills by asking questions related to networking.	2
8	Ruby	This assessment tests your ruby skills by asking diverse set of questions.	2
9	C++ Assessment	This assessment checks your C++ skills by asking diverse set of questions.	2
\.


--
-- TOC entry 3443 (class 0 OID 16476)
-- Dependencies: 227
-- Data for Name: get_test_go_assessment_question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.get_test_go_assessment_question (assessment_question_id, assessment_id, question_id) FROM stdin;
\.


--
-- TOC entry 3431 (class 0 OID 16400)
-- Dependencies: 215
-- Data for Name: get_test_go_assessment_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.get_test_go_assessment_type (assessment_type_id, assessment_type_name, assessment_type_details) FROM stdin;
1	GENERAL	general tests can include IQ test, EQ test etc.
2	TECHNICAL	technical tests can include any type of test that has some technicality in it e.g. C++, Python etc.
\.


--
-- TOC entry 3447 (class 0 OID 16514)
-- Dependencies: 232
-- Data for Name: get_test_go_candidate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.get_test_go_candidate (candidate_id, first_name, last_name, email, password) FROM stdin;
1	Asim	Raza	asim@gmail.com	$2b$10$DvDIU21QKWBZoxMp0/q38ex/WnW1N/940VCWjBryBOU9Q2.MVpy7W
\.


--
-- TOC entry 3449 (class 0 OID 16537)
-- Dependencies: 234
-- Data for Name: get_test_go_candidate_assessment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.get_test_go_candidate_assessment (candidate_id, assessment_id) FROM stdin;
\.


--
-- TOC entry 3439 (class 0 OID 16450)
-- Dependencies: 223
-- Data for Name: get_test_go_mcq_answer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.get_test_go_mcq_answer (mcq_id, question_id, option_one, option_two, option_three, option_four, correct_answer) FROM stdin;
1	2	DEF aFunc;	def aFunc:	function aFunc:	def aFunc():	def aFunc:
\.


--
-- TOC entry 3437 (class 0 OID 16434)
-- Dependencies: 221
-- Data for Name: get_test_go_question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.get_test_go_question (question_id, question_type, question) FROM stdin;
1	2	Is python a weakly typed language?
2	1	Select the correct way of defining a function in python.
\.


--
-- TOC entry 3435 (class 0 OID 16427)
-- Dependencies: 219
-- Data for Name: get_test_go_question_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.get_test_go_question_type (question_type_id, question_type_name) FROM stdin;
1	MCQ
2	TrueFalse
\.


--
-- TOC entry 3445 (class 0 OID 16503)
-- Dependencies: 230
-- Data for Name: get_test_go_recruiter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.get_test_go_recruiter (recruiter_id, first_name, last_name, email, password) FROM stdin;
1	Ali	Raza	ali@gmail.com	$2b$10$q6v/g6508b8iY6EjdB1RF.tWaYglagvLXwqEif.6APAoISLqFJqo.
\.


--
-- TOC entry 3448 (class 0 OID 16524)
-- Dependencies: 233
-- Data for Name: get_test_go_recruiter_assessment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.get_test_go_recruiter_assessment (recruiter_id, assessment_id) FROM stdin;
1	3
1	5
1	6
1	7
1	8
1	9
\.


--
-- TOC entry 3441 (class 0 OID 16464)
-- Dependencies: 225
-- Data for Name: get_test_go_true_false_answer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.get_test_go_true_false_answer (true_false_id, question_id, answer) FROM stdin;
1	1	t
\.


--
-- TOC entry 3466 (class 0 OID 0)
-- Dependencies: 216
-- Name: get_test_go_assessment_assessment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.get_test_go_assessment_assessment_id_seq', 9, true);


--
-- TOC entry 3467 (class 0 OID 0)
-- Dependencies: 226
-- Name: get_test_go_assessment_question_assessment_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.get_test_go_assessment_question_assessment_question_id_seq', 2, true);


--
-- TOC entry 3468 (class 0 OID 0)
-- Dependencies: 214
-- Name: get_test_go_assessment_type_assessment_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.get_test_go_assessment_type_assessment_type_id_seq', 2, true);


--
-- TOC entry 3469 (class 0 OID 0)
-- Dependencies: 231
-- Name: get_test_go_candidate_candidate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.get_test_go_candidate_candidate_id_seq', 1, true);


--
-- TOC entry 3470 (class 0 OID 0)
-- Dependencies: 222
-- Name: get_test_go_mcq_answer_mcq_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.get_test_go_mcq_answer_mcq_id_seq', 1, true);


--
-- TOC entry 3471 (class 0 OID 0)
-- Dependencies: 220
-- Name: get_test_go_question_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.get_test_go_question_question_id_seq', 2, true);


--
-- TOC entry 3472 (class 0 OID 0)
-- Dependencies: 218
-- Name: get_test_go_question_type_question_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.get_test_go_question_type_question_type_id_seq', 2, true);


--
-- TOC entry 3473 (class 0 OID 0)
-- Dependencies: 229
-- Name: get_test_go_recruiter_recruiter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.get_test_go_recruiter_recruiter_id_seq', 1, true);


--
-- TOC entry 3474 (class 0 OID 0)
-- Dependencies: 224
-- Name: get_test_go_true_false_answer_true_false_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.get_test_go_true_false_answer_true_false_id_seq', 1, true);


--
-- TOC entry 3252 (class 2606 OID 16420)
-- Name: get_test_go_assessment get_test_go_assessment_assessment_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_assessment
    ADD CONSTRAINT get_test_go_assessment_assessment_name_key UNIQUE (assessment_name);


--
-- TOC entry 3254 (class 2606 OID 16418)
-- Name: get_test_go_assessment get_test_go_assessment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_assessment
    ADD CONSTRAINT get_test_go_assessment_pkey PRIMARY KEY (assessment_id);


--
-- TOC entry 3266 (class 2606 OID 16481)
-- Name: get_test_go_assessment_question get_test_go_assessment_question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_assessment_question
    ADD CONSTRAINT get_test_go_assessment_question_pkey PRIMARY KEY (assessment_question_id);


--
-- TOC entry 3248 (class 2606 OID 16409)
-- Name: get_test_go_assessment_type get_test_go_assessment_type_assessment_type_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_assessment_type
    ADD CONSTRAINT get_test_go_assessment_type_assessment_type_name_key UNIQUE (assessment_type_name);


--
-- TOC entry 3250 (class 2606 OID 16407)
-- Name: get_test_go_assessment_type get_test_go_assessment_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_assessment_type
    ADD CONSTRAINT get_test_go_assessment_type_pkey PRIMARY KEY (assessment_type_id);


--
-- TOC entry 3272 (class 2606 OID 16523)
-- Name: get_test_go_candidate get_test_go_candidate_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_candidate
    ADD CONSTRAINT get_test_go_candidate_email_key UNIQUE (email);


--
-- TOC entry 3274 (class 2606 OID 16521)
-- Name: get_test_go_candidate get_test_go_candidate_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_candidate
    ADD CONSTRAINT get_test_go_candidate_pkey PRIMARY KEY (candidate_id);


--
-- TOC entry 3262 (class 2606 OID 16457)
-- Name: get_test_go_mcq_answer get_test_go_mcq_answer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_mcq_answer
    ADD CONSTRAINT get_test_go_mcq_answer_pkey PRIMARY KEY (mcq_id);


--
-- TOC entry 3258 (class 2606 OID 16441)
-- Name: get_test_go_question get_test_go_question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_question
    ADD CONSTRAINT get_test_go_question_pkey PRIMARY KEY (question_id);


--
-- TOC entry 3260 (class 2606 OID 16443)
-- Name: get_test_go_question get_test_go_question_question_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_question
    ADD CONSTRAINT get_test_go_question_question_key UNIQUE (question);


--
-- TOC entry 3256 (class 2606 OID 16432)
-- Name: get_test_go_question_type get_test_go_question_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_question_type
    ADD CONSTRAINT get_test_go_question_type_pkey PRIMARY KEY (question_type_id);


--
-- TOC entry 3268 (class 2606 OID 16512)
-- Name: get_test_go_recruiter get_test_go_recruiter_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_recruiter
    ADD CONSTRAINT get_test_go_recruiter_email_key UNIQUE (email);


--
-- TOC entry 3270 (class 2606 OID 16510)
-- Name: get_test_go_recruiter get_test_go_recruiter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_recruiter
    ADD CONSTRAINT get_test_go_recruiter_pkey PRIMARY KEY (recruiter_id);


--
-- TOC entry 3264 (class 2606 OID 16469)
-- Name: get_test_go_true_false_answer get_test_go_true_false_answer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_true_false_answer
    ADD CONSTRAINT get_test_go_true_false_answer_pkey PRIMARY KEY (true_false_id);


--
-- TOC entry 3279 (class 2606 OID 16482)
-- Name: get_test_go_assessment_question fk_assessment_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_assessment_question
    ADD CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES public.get_test_go_assessment(assessment_id);


--
-- TOC entry 3281 (class 2606 OID 16532)
-- Name: get_test_go_recruiter_assessment fk_assessment_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_recruiter_assessment
    ADD CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES public.get_test_go_assessment(assessment_id);


--
-- TOC entry 3283 (class 2606 OID 16545)
-- Name: get_test_go_candidate_assessment fk_assessment_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_candidate_assessment
    ADD CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES public.get_test_go_assessment(assessment_id);


--
-- TOC entry 3275 (class 2606 OID 16421)
-- Name: get_test_go_assessment fk_assessment_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_assessment
    ADD CONSTRAINT fk_assessment_type FOREIGN KEY (assessment_type) REFERENCES public.get_test_go_assessment_type(assessment_type_id);


--
-- TOC entry 3284 (class 2606 OID 16540)
-- Name: get_test_go_candidate_assessment fk_candidate_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_candidate_assessment
    ADD CONSTRAINT fk_candidate_id FOREIGN KEY (candidate_id) REFERENCES public.get_test_go_candidate(candidate_id);


--
-- TOC entry 3277 (class 2606 OID 16458)
-- Name: get_test_go_mcq_answer fk_question_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_mcq_answer
    ADD CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES public.get_test_go_question(question_id);


--
-- TOC entry 3278 (class 2606 OID 16470)
-- Name: get_test_go_true_false_answer fk_question_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_true_false_answer
    ADD CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES public.get_test_go_question(question_id);


--
-- TOC entry 3280 (class 2606 OID 16487)
-- Name: get_test_go_assessment_question fk_question_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_assessment_question
    ADD CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES public.get_test_go_question(question_id);


--
-- TOC entry 3276 (class 2606 OID 16444)
-- Name: get_test_go_question fk_question_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_question
    ADD CONSTRAINT fk_question_type FOREIGN KEY (question_type) REFERENCES public.get_test_go_question_type(question_type_id);


--
-- TOC entry 3282 (class 2606 OID 16527)
-- Name: get_test_go_recruiter_assessment fk_recruiter_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_test_go_recruiter_assessment
    ADD CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES public.get_test_go_recruiter(recruiter_id);


-- Completed on 2023-02-13 18:56:15

create table get_test_go_job_types(
	job_type_id serial primary key,
	job_type_name varchar(50) unique not null,
	job_type_details text not null
);

insert into get_test_go_job_types(job_type_name, job_type_details) values('ENTRY LEVEL', 'Entry level jobs require 0 to 5 years of experience.');
insert into get_test_go_job_types(job_type_name, job_type_details) values('JUNIOR LEVEL', 'Junior level jobs require 1 to 3 years of experience');
insert into get_test_go_job_types(job_type_name, job_type_details) values('MID LEVEL', 'Mid level jobs require 4 to 6 years of experience');
insert into get_test_go_job_types(job_type_name, job_type_details) values('SENIOR LEVEL', 'Senior level jobs require 6+ years of experience');