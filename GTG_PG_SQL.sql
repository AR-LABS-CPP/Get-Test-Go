CREATE TABLE get_test_go_assessment_type(
	assessment_type_id serial4 PRIMARY KEY,
	assessment_type_name varchar(255) UNIQUE NOT NULL,
	assessment_type_details text NOT NULL
);

CREATE TABLE get_test_go_candidate(
	candidate_id serial4 PRIMARY KEY,
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	email varchar(150) UNIQUE NOT NULL,
	"password" text NOT NULL
);

CREATE TABLE get_test_go_job_types(
	job_type_id serial4 PRIMARY KEY,
	job_type_name varchar(50) UNIQUE NOT NULL,
	job_type_details text NOT NULL
);

CREATE TABLE get_test_go_question_type(
	question_type_id serial4 PRIMARY KEY,
	question_type_name varchar(100) NOT NULL
);

CREATE TABLE get_test_go_recruiter(
	recruiter_id serial4 PRIMARY KEY,
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	email varchar(150) UNIQUE NOT NULL,
	"password" text NOT NULL
);

CREATE TABLE get_test_go_assessment(
	assessment_id serial4 PRIMARY KEY,
	assessment_name varchar(100) UNIQUE NOT NULL,
	assessment_details text NOT NULL,
	assessment_type int4 NULL,
	CONSTRAINT fk_assessment_type FOREIGN KEY (assessment_type) REFERENCES get_test_go_assessment_type(assessment_type_id)
);

CREATE TABLE get_test_go_candidate_assessment(
	candidate_id int4 NULL,
	assessment_id int4 NULL,
	CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES get_test_go_assessment(assessment_id),
	CONSTRAINT fk_candidate_id FOREIGN KEY (candidate_id) REFERENCES get_test_go_candidate(candidate_id)
);

CREATE TABLE get_test_go_question(
	question_id serial4 PRIMARY KEY,
	question_type int4 UNIQUE NOT NULL,
	question TEXT NOT NULL,
	CONSTRAINT fk_question_type FOREIGN KEY (question_type) REFERENCES get_test_go_question_type(question_type_id)
);

CREATE TABLE get_test_go_recruiter_assessment(
	recruiter_id int4 NOT NULL,
	assessment_id serial NOT NULL,
	assessment_name TEXT UNIQUE NOT NULL,
	assessment_details TEXT DEFAULT 'No details provided',
	assessment_type int4 NOT NULL,
	CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES get_test_go_recruiter(recruiter_id)
);

CREATE TABLE get_test_go_recruiter_assessment_question(
	recruiter_id int4 NOT NULL,
	assessment_id int4 NOT NULL,
	question_id int4 NOT NULL,
	CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES get_test_go_recruiter(recruiter_id),
	CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES get_test_go_assessment(assessment_id),
	CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES get_test_go_question(question_id)
);

CREATE TABLE get_test_go_true_false_answer(
	true_false_id serial4 PRIMARY KEY,
	question_id int4 NOT NULL,
	answer bool NOT NULL,
	CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES get_test_go_question(question_id)
);

CREATE TABLE get_test_go_assessment_question(
	assessment_question_id serial4 PRIMARY KEY,
	assessment_id int4 NOT NULL,
	question_id int4 NOT NULL,
	CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES get_test_go_assessment(assessment_id),
	CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES get_test_go_question(question_id)
);

CREATE TABLE get_test_go_mcq_answer(
	mcq_id serial4 PRIMARY KEY,
	question_id int4 NOT NULL,
	option_one text NOT NULL,
	option_two text NOT NULL,
	option_three text NOT NULL,
	option_four text NOT NULL,
	correct_answer text NOT NULL,
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

INSERT INTO get_test_go_assessment_type(assessment_type_name, assessment_type_details)
VALUES('GENERAL', 'general tests can include IQ test, EQ test etc.');

INSERT INTO get_test_go_assessment_type(assessment_type_name, assessment_type_details)
VALUES('TECHNICAL', 'technical tests can include any type of test that has some technicality in it e.g. C++, Python etc.');

INSERT INTO get_test_go_job_types(job_type_name, job_type_details) VALUES('ENTRY LEVEL', '0 to 3 years of experience');
INSERT INTO get_test_go_job_types(job_type_name, job_type_details) VALUES('JUNIOR LEVEL', '1 to 3 years of experience');
INSERT INTO get_test_go_job_types(job_type_name, job_type_details) VALUES('MID LEVEL', '3 to 5 years of experience');
INSERT INTO get_test_go_job_types(job_type_name, job_type_details) VALUES('SENIOR LEVEL', '6+ years of experience');

CREATE VIEW get_test_go_assessment_with_question
AS SELECT get_test_go_assessment.assessment_id,
    get_test_go_assessment.assessment_name,
    get_test_go_question.question_id,
    get_test_go_question.question FROM get_test_go_assessment
    	JOIN get_test_go_assessment_question ON get_test_go_assessment_question.assessment_id = get_test_go_assessment.assessment_id
    	JOIN get_test_go_question ON get_test_go_assessment_question.question_id = get_test_go_question.question_id;

CREATE VIEW get_test_go_assessments_of_candidate
AS 
	SELECT get_test_go_candidate.candidate_id,
	    get_test_go_candidate.email,
	    get_test_go_assessment.assessment_id,
	    get_test_go_assessment.assessment_name 
	FROM get_test_go_candidate
		JOIN get_test_go_candidate_assessment ON get_test_go_candidate.candidate_id = get_test_go_candidate_assessment.candidate_id
		JOIN get_test_go_assessment ON get_test_go_candidate_assessment.assessment_id = get_test_go_assessment.assessment_id;

create VIEW get_test_go_assessments_of_recruiter
AS 
	SELECT get_test_go_recruiter.recruiter_id,
	    get_test_go_recruiter.email,
	    get_test_go_assessment.assessment_id,
	    get_test_go_assessment.assessment_name,
	    get_test_go_assessment.assessment_details 
	FROM get_test_go_recruiter
		JOIN get_test_go_recruiter_assessment ON get_test_go_recruiter.recruiter_id = get_test_go_recruiter_assessment.recruiter_id
		JOIN get_test_go_assessment ON get_test_go_recruiter_assessment.assessment_id = get_test_go_assessment.assessment_id;
	
CREATE VIEW get_test_go_recruiter_assessment_and_question
AS
	SELECT 
		get_test_go_recruiter.recruiter_id,
		get_test_go_recruiter.email,
		get_test_go_assessment.assessment_id,
		get_test_go_assessment.assessment_details,
		get_test_go_question.question_id,
		get_test_go_question.question_type,
		get_test_go_question.question 
	FROM get_test_go_recruiter_assessment_question
	JOIN get_test_go_recruiter
		ON get_test_go_recruiter.recruiter_id = get_test_go_recruiter_assessment_question.recruiter_id
	JOIN get_test_go_assessment
		ON get_test_go_assessment.assessment_id = get_test_go_recruiter_assessment_question.assessment_id
	JOIN get_test_go_question
		ON get_test_go_question.question_id = get_test_go_recruiter_assessment_question.question_id

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

CREATE OR REPLACE PROCEDURE add_job(IN name_of_job varchar(100), IN details_of_job TEXT, IN type_of_job varchar(30))
 LANGUAGE plpgsql
AS $procedure$
	begin
		INSERT INTO get_test_go_job(job_name, job_details, job_type) VALUES(name_of_job, details_of_job, 
			(SELECT job_type_id FROM get_test_go_job_types WHERE job_type_name = type_of_job));
		
		commit;
	end;
$procedure$
;

CREATE OR REPLACE PROCEDURE add_job_assessment(IN name_of_job varchar(100), IN name_of_assessment varchar(100))
 LANGUAGE plpgsql
AS $procedure$
	begin
		INSERT INTO get_test_go_job_assessment(job_id, assessment_id) values(
			(SELECT job_id FROM get_test_go_job WHERE job_name = name_of_job),
			(SELECT assessment_id FROM get_test_go_assessment WHERE assessment_name = name_of_assessment));
		
		commit;
	end;
$procedure$
;

CREATE OR REPLACE FUNCTION recruiterAssessmentExists(recruiter_email VARCHAR(150), name_of_assessment TEXT)
RETURNS integer 
AS $$
		DECLARE assessment_count integer;
        BEGIN
	       SELECT COUNT(*) INTO assessment_count FROM get_test_go_recruiter_assessment
	       WHERE recruiter_id = (SELECT recruiter_id FROM get_test_go_recruiter WHERE email = recruiter_email)
	       AND assessment_name = name_of_assessment;
	      
	      RETURN assessment_count;
        END;
$$ LANGUAGE plpgsql;