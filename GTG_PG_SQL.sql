-- ####################################### TABLES #######################################

CREATE TABLE get_test_go_assessment_type (
	assessment_type_id serial4 NOT NULL,
	assessment_type_name varchar(255) NOT NULL,
	assessment_type_details text NOT NULL,
	CONSTRAINT get_test_go_assessment_type_assessment_type_name_key UNIQUE (assessment_type_name),
	CONSTRAINT get_test_go_assessment_type_pkey PRIMARY KEY (assessment_type_id)
);

CREATE TABLE get_test_go_candidate (
	candidate_id serial4 NOT NULL,
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	email varchar(150) NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT get_test_go_candidate_email_key UNIQUE (email),
	CONSTRAINT get_test_go_candidate_pkey PRIMARY KEY (candidate_id)
);

CREATE TABLE get_test_go_job_types (
	job_type_id serial4 NOT NULL,
	job_type_name varchar(50) NOT NULL,
	job_type_details text NOT NULL,
	CONSTRAINT get_test_go_job_types_job_type_name_key UNIQUE (job_type_name),
	CONSTRAINT get_test_go_job_types_pkey PRIMARY KEY (job_type_id)
);

CREATE TABLE get_test_go_question_type (
	question_type_id serial4 NOT NULL,
	question_type_name varchar(100) NOT NULL,
	CONSTRAINT get_test_go_question_type_pkey PRIMARY KEY (question_type_id)
);

CREATE TABLE get_test_go_recruiter (
	recruiter_id serial4 NOT NULL,
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	email varchar(150) NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT get_test_go_recruiter_email_key UNIQUE (email),
	CONSTRAINT get_test_go_recruiter_pkey PRIMARY KEY (recruiter_id)
);

CREATE TABLE get_test_go_assessment (
	assessment_id serial4 NOT NULL,
	assessment_name varchar(100) NOT NULL,
	assessment_details text NOT NULL,
	assessment_type int4 NULL,
	CONSTRAINT get_test_go_assessment_assessment_name_key UNIQUE (assessment_name),
	CONSTRAINT get_test_go_assessment_pkey PRIMARY KEY (assessment_id),
	CONSTRAINT fk_assessment_type FOREIGN KEY (assessment_type) REFERENCES get_test_go_assessment_type(assessment_type_id)
);

CREATE TABLE get_test_go_candidate_assessment (
	candidate_id int4 NULL,
	assessment_id int4 NULL,
	CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES get_test_go_assessment(assessment_id),
	CONSTRAINT fk_candidate_id FOREIGN KEY (candidate_id) REFERENCES get_test_go_candidate(candidate_id)
);

CREATE TABLE get_test_go_question (
	question_id serial4 NOT NULL,
	question_type int4 NULL,
	question text NOT NULL,
	CONSTRAINT get_test_go_question_pkey PRIMARY KEY (question_id),
	CONSTRAINT get_test_go_question_question_key UNIQUE (question),
	CONSTRAINT fk_question_type FOREIGN KEY (question_type) REFERENCES get_test_go_question_type(question_type_id)
);

CREATE TABLE get_test_go_recruiter_assessment (
	recruiter_id int4 NULL,
	assessment_id int4 NULL,
	CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES get_test_go_assessment(assessment_id),
	CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES get_test_go_recruiter(recruiter_id)
);

CREATE TABLE get_test_go_true_false_answer (
	true_false_id serial4 NOT NULL,
	question_id int4 NULL,
	answer bool NOT NULL,
	CONSTRAINT get_test_go_true_false_answer_pkey PRIMARY KEY (true_false_id),
	CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES get_test_go_question(question_id)
);

CREATE TABLE get_test_go_assessment_question (
	assessment_question_id serial4 NOT NULL,
	assessment_id int4 NULL,
	question_id int4 NULL,
	CONSTRAINT get_test_go_assessment_question_pkey PRIMARY KEY (assessment_question_id),
	CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES get_test_go_assessment(assessment_id),
	CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES get_test_go_question(question_id)
);

CREATE TABLE get_test_go_mcq_answer (
	mcq_id serial4 NOT NULL,
	question_id int4 NULL,
	option_one text NOT NULL,
	option_two text NOT NULL,
	option_three text NOT NULL,
	option_four text NOT NULL,
	correct_answer text NOT NULL,
	CONSTRAINT get_test_go_mcq_answer_pkey PRIMARY KEY (mcq_id),
	CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES get_test_go_question(question_id)
);

CREATE TABLE get_test_go_job(
	job_id SERIAL PRIMARY KEY,
	job_name varchar(100) UNIQUE NOT NULL,
	job_details TEXT NOT NULL,
	job_type int4 NOT NULL,
	CONSTRAINT fk_job_type FOREIGN KEY(job_type) REFERENCES get_test_go_job_types(job_type_id)
);

CREATE TABLE get_test_go_job_assessment(
	job_id int4 NOT NULL,
	assessment_id int4 NOT NULL,
	CONSTRAINT fk_job_id FOREIGN KEY(job_id) REFERENCES get_test_go_job(job_id),
	CONSTRAINT fk_assessment_id FOREIGN KEY(assessment_id) REFERENCES get_test_go_assessment(assessment_id)
);


-- ####################################### VIEWS #######################################


CREATE OR REPLACE VIEW public.get_test_go_assessment_with_question
AS SELECT get_test_go_assessment.assessment_id,
    get_test_go_assessment.assessment_name,
    get_test_go_question.question_id,
    get_test_go_question.question
   FROM get_test_go_assessment
     JOIN get_test_go_assessment_question ON get_test_go_assessment_question.assessment_id = get_test_go_assessment.assessment_id
     JOIN get_test_go_question ON get_test_go_assessment_question.question_id = get_test_go_question.question_id;

CREATE OR REPLACE VIEW public.get_test_go_assessments_of_candidate
AS SELECT get_test_go_candidate.candidate_id,
    get_test_go_candidate.email,
    get_test_go_assessment.assessment_id,
    get_test_go_assessment.assessment_name
   FROM get_test_go_candidate
     JOIN get_test_go_candidate_assessment ON get_test_go_candidate.candidate_id = get_test_go_candidate_assessment.candidate_id
     JOIN get_test_go_assessment ON get_test_go_candidate_assessment.assessment_id = get_test_go_assessment.assessment_id;

CREATE OR REPLACE VIEW public.get_test_go_assessments_of_recruiter
AS SELECT get_test_go_recruiter.recruiter_id,
    get_test_go_recruiter.email,
    get_test_go_assessment.assessment_id,
    get_test_go_assessment.assessment_name,
    get_test_go_assessment.assessment_details
   FROM get_test_go_recruiter
     JOIN get_test_go_recruiter_assessment ON get_test_go_recruiter.recruiter_id = get_test_go_recruiter_assessment.recruiter_id
     JOIN get_test_go_assessment ON get_test_go_recruiter_assessment.assessment_id = get_test_go_assessment.assessment_id;

    
-- ####################################### STORED PROCEDURES #######################################

    
CREATE OR REPLACE PROCEDURE add_assessment_mcq(IN name_of_assessment character varying, IN mcq_question text, IN option_one text, IN option_two text, IN option_three text, IN option_four text, IN correct_answer text)
 LANGUAGE plpgsql
AS $procedure$
	begin
		insert into get_test_go_question(question_type, question) values(1, mcq_question);
		insert into get_test_go_assessment_question(assessment_id, question_id) 
			values((select assessment_id from get_test_go_assessment where assessment_name = name_of_assessment), (select question_id from get_test_go_question where question = mcq_question));
		insert into get_test_go_mcq_answer(question_id, option_one, option_two, option_three, option_four, correct_answer)
			values((select question_id from get_test_go_question where question = mcq_question), option_one, option_two, option_three, option_four, correct_answer);
		
		commit;
	end;
$procedure$
;

CREATE OR REPLACE procedure add_assessment_true_false(IN name_of_assessment character varying, IN true_false_question text, IN answer boolean)
 LANGUAGE plpgsql
AS $procedure$
	begin
		insert into get_test_go_question(question_type, question) values(2, true_false_question);
		insert into get_test_go_assessment_question(assessment_id, question_id)
			values((select assessment_id from get_test_go_assessment where assessment_name = name_of_assessment), (select question_id from get_test_go_question where question = true_false_question));
		insert into get_test_go_true_false_answer(question_id, answer)
			values((select question_id from get_test_go_question where question = true_false_question), answer);
		
		commit;
	end;
$procedure$
;

CREATE OR REPLACE PROCEDURE assessment_question_exists(IN name_of_assessment character varying, IN question_text text)
 LANGUAGE plpgsql
AS $procedure$
	begin
		
				
		commit;
	end;
$procedure$
;

CREATE OR REPLACE PROCEDURE bind_candidate_and_assessment(IN candidate_email character varying, IN name_of_assessment character varying)
 LANGUAGE plpgsql
AS $procedure$
	begin
		insert into get_test_go_candidate_assessment(candidate_id, assessment_id) 
			values((select recruiter_id from get_test_go_candidate where email = candidate_email), (select assessment_id from get_test_go_assessment where assessment_name = name_of_assessment));
		
		commit;
	end;
	
$procedure$
;

CREATE OR REPLACE PROCEDURE bind_recruiter_and_assessment(IN recruiter_email character varying, IN name_of_assessment character varying)
 LANGUAGE plpgsql
AS $procedure$
	begin
		insert into get_test_go_recruiter_assessment(recruiter_id, assessment_id) 
			values((select recruiter_id from get_test_go_recruiter where email = recruiter_email), (select assessment_id from get_test_go_assessment where assessment_name = name_of_assessment));
		
		commit;
	end;
	
$procedure$
;