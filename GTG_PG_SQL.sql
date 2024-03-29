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

CREATE TABLE get_test_go_candidate_applied_job(
	id SERIAL4 PRIMARY KEY,
	candidate_email CHARACTER VARYING,
	job_name CHARACTER VARYING
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

CREATE TABLE get_test_go_recruiter_assessment(
	recruiter_id int4 NOT NULL,
	assessment_id serial UNIQUE NOT NULL,
	assessment_name TEXT UNIQUE NOT NULL,
	assessment_details TEXT DEFAULT 'No details provided',
	assessment_type int4 NOT NULL,
	CONSTRAINT fk_assessment_type FOREIGN KEY (assessment_type) REFERENCES get_test_go_assessment_type(assessment_type_id),
	CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES get_test_go_recruiter(recruiter_id)
);

CREATE TABLE get_test_go_candidate_assessment(
	candidate_id int4 NOT NULL,
	recruiter_id int4 NOT NULL,
	assessment_id int4 NOT NULL,
	CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES get_test_go_recruiter_assessment(assessment_id),
	CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES get_test_go_recruiter(recruiter_id),
	CONSTRAINT fk_candidate_id FOREIGN KEY (candidate_id) REFERENCES get_test_go_candidate(candidate_id)
);

CREATE TABLE get_test_go_question(
	question_id serial4 PRIMARY KEY,
	question_type int4 NOT NULL,
	question TEXT NOT NULL,
	CONSTRAINT fk_question_type FOREIGN KEY (question_type) REFERENCES get_test_go_question_type(question_type_id) ON DELETE CASCADE
);

CREATE TABLE get_test_go_recruiter_assessment_question(
	recruiter_id int4 NOT NULL,
	assessment_id int4 NOT NULL,
	question_id int4 NOT NULL,
	CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES get_test_go_recruiter(recruiter_id),
	CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES get_test_go_recruiter_assessment(assessment_id),
	CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES get_test_go_question(question_id)
);

CREATE TABLE get_test_go_true_false_answer(
	true_false_id serial4 PRIMARY KEY,
	question_id int4 NOT NULL,
	answer bool NOT NULL,
	CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES get_test_go_question(question_id)
);

-- CREATE TABLE get_test_go_recruiter_assessment_question(
-- 	assessment_question_id serial4 PRIMARY KEY,
-- 	assessment_id int4 NOT NULL,
-- 	question_id int4 NOT NULL,
-- 	CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES get_test_go_recruiter_assessment(assessment_id),
-- 	CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES get_test_go_question(question_id)
-- );

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

CREATE TABLE get_test_go_recruiter_job(
	recruiter_id int4 NOT NULL,
	job_id SERIAL UNIQUE NOT NULL,
	job_name TEXT UNIQUE NOT NULL,
	job_details TEXT NOT NULL,
	job_type int4 NOT NULL,
	CONSTRAINT fk_job_type FOREIGN KEY (job_type) REFERENCES get_test_go_job_types(job_type_id),
	CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES get_test_go_recruiter(recruiter_id)
);

CREATE TABLE get_test_go_recruiter_job_assessment(
	recruiter_id int4 NOT NULL,
	job_id int4 NOT NULL,
	assessment_id int4 NOT NULL,
	CONSTRAINT fk_job_id FOREIGN KEY (job_id) REFERENCES get_test_go_recruiter_job(job_id),
	CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES get_test_go_recruiter_assessment(assessment_id),
	CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES get_test_go_recruiter(recruiter_id)
);

CREATE TABLE get_test_go_assessment_passing_threshold(
	id SERIAL PRIMARY KEY,
	threshold INT NOT NULL
);

--CREATE TABLE get_test_go_candidate_job_assessment_score(
--	candidate_id int4 NOT NULL,
--	recruiter_id int4 NOT NULL,
--	job_id int4 NOT NULL,
--	assessment_id int4 NOT NULL,
--	score int4 NOT NULL,
--	CONSTRAINT fk_candidate_id FOREIGN KEY (candidate_id) REFERENCES get_test_go_candidate(candidate_id),
--	CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES get_test_go_recruiter(recruiter_id),
--	CONSTRAINT fk_job_id FOREIGN KEY (job_id) REFERENCES get_test_go_recruiter_job(job_id),
--	CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES get_test_go_recruiter_assessment(assessment_id)
--);

CREATE TABLE get_test_go_candidate_job_assessment_score(
	candidate_email CHARACTER VARYING NOT NULL,
	recruiter_email CHARACTER VARYING NOT NULL,
	job_name CHARACTER VARYING NOT NULL,
	assessment_name CHARACTER VARYING NOT NULL,
	score int4 NOT NULL
);

INSERT INTO get_test_go_assessment_type(assessment_type_name, assessment_type_details)
VALUES('GENERAL', 'general tests can include IQ test, EQ test etc.');

INSERT INTO get_test_go_assessment_type(assessment_type_name, assessment_type_details)
VALUES('TECHNICAL', 'technical tests can include any type of test that has some technicality in it e.g. C++, Python etc.');

INSERT INTO get_test_go_question_type(question_type_name) VALUES('MCQ');
INSERT INTO get_test_go_question_type(question_type_name) VALUES('TrueFalse');

INSERT INTO get_test_go_job_types(job_type_name, job_type_details) VALUES('ENTRY LEVEL', '0 to 3 years of experience');
INSERT INTO get_test_go_job_types(job_type_name, job_type_details) VALUES('JUNIOR LEVEL', '1 to 3 years of experience');
INSERT INTO get_test_go_job_types(job_type_name, job_type_details) VALUES('MID LEVEL', '3 to 5 years of experience');
INSERT INTO get_test_go_job_types(job_type_name, job_type_details) VALUES('SENIOR LEVEL', '6+ years of experience');
	
CREATE VIEW get_test_go_recruiter_assessment_and_question
AS
	SELECT 
		get_test_go_recruiter.recruiter_id,
		get_test_go_recruiter.email,
		get_test_go_recruiter_assessment.assessment_id,
		get_test_go_recruiter_assessment.assessment_details,
		get_test_go_question.question_id,
		get_test_go_question.question_type,
		get_test_go_question.question 
	FROM get_test_go_recruiter_assessment_question
	JOIN get_test_go_recruiter
		ON get_test_go_recruiter.recruiter_id = get_test_go_recruiter_assessment_question.recruiter_id
	JOIN get_test_go_recruiter_assessment
		ON get_test_go_recruiter_assessment.assessment_id = get_test_go_recruiter_assessment_question.assessment_id
	JOIN get_test_go_question
		ON get_test_go_question.question_id = get_test_go_recruiter_assessment_question.question_id;

CREATE OR REPLACE PROCEDURE add_assessment_mcq(IN recruiter_email VARCHAR(150), IN name_of_assessment character varying, IN mcq_question text, IN option_one text, IN option_two text, IN option_three text, IN option_four text, IN correct_answer text)
LANGUAGE plpgsql
AS $procedure$
	BEGIN
		INSERT INTO get_test_go_question(question_type, question) VALUES(1, mcq_question);
		WITH CTE_recruiter_id AS(
			SELECT recruiter_id FROM get_test_go_recruiter WHERE email = recruiter_email
		)
		INSERT INTO get_test_go_recruiter_assessment_question(recruiter_id, assessment_id, question_id)
		VALUES((SELECT recruiter_id FROM CTE_recruiter_id), (SELECT assessment_id FROM get_test_go_recruiter_assessment WHERE assessment_name = name_of_assessment AND recruiter_id = (SELECT recruiter_id FROM CTE_recruiter_id)), (SELECT question_id FROM get_test_go_question WHERE question = mcq_question));		
		INSERT INTO get_test_go_mcq_answer(question_id, option_one, option_two, option_three, option_four, correct_answer)
		VALUES((SELECT question_id FROM get_test_go_question WHERE question = mcq_question), option_one, option_two, option_three, option_four, correct_answer);
		
		commit;
	end;
$procedure$;

CREATE OR REPLACE PROCEDURE add_assessment_true_false(IN recruiter_email VARCHAR(150), IN name_of_assessment character varying, IN true_false_question text, IN answer boolean)
 LANGUAGE plpgsql
AS $procedure$
	BEGIN
		INSERT INTO get_test_go_question(question_type, question) VALUES(2, true_false_question);
		WITH CTE_recruiter_id AS(
			SELECT recruiter_id FROM get_test_go_recruiter WHERE email = recruiter_email
		)
		INSERT INTO get_test_go_recruiter_assessment_question(recruiter_id, assessment_id, question_id)
		VALUES((SELECT recruiter_id FROM CTE_recruiter_id), (SELECT assessment_id FROM get_test_go_recruiter_assessment WHERE assessment_name = name_of_assessment AND recruiter_id = (SELECT recruiter_id FROM CTE_recruiter_id)), (SELECT question_id FROM get_test_go_question WHERE question = true_false_question));
		INSERT INTO get_test_go_true_false_answer(question_id, answer)
		VALUES((SELECT question_id FROM get_test_go_question WHERE question = true_false_question), answer);
		
		commit;
	end;
$procedure$;

CREATE OR REPLACE PROCEDURE bind_recruiter_and_assessment(IN recruiter_email character varying, IN name_of_assessment character varying)
 LANGUAGE plpgsql
AS $procedure$
	begin
		insert into get_test_go_recruiter_assessment(recruiter_id, assessment_id) 
			values((select recruiter_id from get_test_go_recruiter where email = recruiter_email), (select assessment_id from get_test_go_assessment where assessment_name = name_of_assessment));
		
		commit;
	end;
	
$procedure$;

CREATE OR REPLACE PROCEDURE save_candidate_scores(
	IN recruiter_email CHARACTER VARYING,
	IN candidate_email CHARACTER VARYING, 
	IN name_of_job CHARACTER VARYING,
	IN name_of_assessment CHARACTER VARYING,
	IN assessment_score int4
)
 LANGUAGE plpgsql
AS $procedure$
	BEGIN
		WITH CTE_recruiter_id AS (
			SELECT recruiter_id FROM get_test_go_recruiter WHERE email = recruiter_email
		)
		INSERT INTO get_test_go_candidate_job_assessment_score(recruiter_id, candidate_id, job_id, assessment_id, score)
		VALUES
		(
			(SELECT recruiter_id FROM CTE_recruiter_id),
			(SELECT candidate_id FROM get_test_go_candidate WHERE email = candidate_email),
			(SELECT job_id FROM get_test_go_recruiter_job WHERE recruiter_id = (SELECT recruiter_id FROM CTE_recruiter_id) AND job_name = name_of_job),	
			(SELECT assessment_id FROM get_test_go_recruiter_assessment WHERE recruiter_id = (SELECT recruiter_id FROM CTE_recruiter_id) AND assessment_name = name_of_assessment),
			assessment_score
		);
		
		COMMIT;
	END;
	
$procedure$;

CREATE OR REPLACE PROCEDURE add_recruiter_job(
	IN recruiter_email CHARACTER VARYING, 
	IN name_of_job varchar(100), 
	IN details_of_job TEXT, 
	IN type_of_job varchar(30)
)
 LANGUAGE plpgsql
AS $procedure$
	begin
		INSERT INTO get_test_go_recruiter_job(recruiter_id, job_name, job_details, job_type)
		VALUES((SELECT recruiter_id FROM get_test_go_recruiter WHERE email = recruiter_email), 
		name_of_job, 
		details_of_job,
		(SELECT job_type_id FROM get_test_go_job_types WHERE job_type_name = type_of_job));
		
		commit;
	end;
$procedure$;

CREATE OR REPLACE PROCEDURE add_recruiter_job_assessment(IN recruiter_email CHARACTER VARYING, IN name_of_job CHARACTER VARYING, IN name_of_assessment CHARACTER VARYING)
 LANGUAGE plpgsql
AS $procedure$
	BEGIN
		WITH CTE_recruiter_id AS (
			SELECT recruiter_id FROM get_test_go_recruiter WHERE email = recruiter_email
		)
		INSERT INTO get_test_go_recruiter_job_assessment(recruiter_id, job_id, assessment_id)
		VALUES((SELECT recruiter_id FROM CTE_recruiter_id),
		(SELECT job_id FROM get_test_go_recruiter_job WHERE recruiter_id = (SELECT recruiter_id FROM CTE_recruiter_id) AND job_name = name_of_job),
		(SELECT assessment_id FROM get_test_go_recruiter_assessment WHERE recruiter_id = (SELECT recruiter_id FROM CTE_recruiter_id) AND assessment_name = name_of_assessment));
		
		commit;
	end;
$procedure$;

CREATE OR REPLACE PROCEDURE create_recruiter_assessment(
	IN recruiter_email VARCHAR(150),
	IN name_of_assessment TEXT, 
	IN details_of_assessment TEXT, 
	IN type_of_assessment INT4
)
 LANGUAGE plpgsql
AS $procedure$
	begin
		INSERT INTO get_test_go_recruiter_assessment(recruiter_id, assessment_name, assessment_details, assessment_type)
		VALUES((SELECT recruiter_id FROM get_test_go_recruiter WHERE email = recruiter_email), name_of_assessment, details_of_assessment, type_of_assessment);
		commit;
	end;
$procedure$;

CREATE OR REPLACE FUNCTION recruiter_assessment_exists(recruiter_email VARCHAR(150), name_of_assessment TEXT)
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

CREATE OR REPLACE FUNCTION assessment_question_exists(recruiter_email varchar(150), name_of_assessment TEXT, question_text TEXT)
RETURNS integer
AS $$
		DECLARE assessment_question_count integer;
		BEGIN
			SELECT COUNT(*) INTO assessment_question_count FROM get_test_go_recruiter_assessment
			JOIN get_test_go_recruiter_assessment_question
				ON get_test_go_recruiter_assessment.assessment_id = get_test_go_recruiter_assessment_question.assessment_id
			JOIN get_test_go_question
				ON get_test_go_recruiter_assessment_question.question_id = get_test_go_question.question_id
			WHERE get_test_go_recruiter_assessment.recruiter_id = (SELECT recruiter_id FROM get_test_go_recruiter WHERE email = recruiter_email)
			AND assessment_name = name_of_assessment AND question = question_text;
		
			RETURN assessment_question_count;
		END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_recruiter_assessment_mcq_questions(recruiter_email varchar(150), name_of_assessment TEXT)
RETURNS SETOF RECORD AS
$$
	WITH CTE_recruiter_mcq_questions AS(
		SELECT
			get_test_go_recruiter_assessment.recruiter_id,
			get_test_go_recruiter_assessment.assessment_id,
			get_test_go_recruiter_assessment.assessment_name,
			get_test_go_recruiter_assessment.assessment_details,
			get_test_go_recruiter_assessment.assessment_type,
			get_test_go_question.question_id,
			get_test_go_question.question,
			get_test_go_question.question_type
		FROM get_test_go_recruiter_assessment
		JOIN get_test_go_recruiter_assessment_question
			ON get_test_go_recruiter_assessment.assessment_id = get_test_go_recruiter_assessment_question.assessment_id
		JOIN get_test_go_question
			ON get_test_go_recruiter_assessment_question.question_id = get_test_go_question.question_id
		WHERE get_test_go_question.question_type = 1
	)
	SELECT * FROM CTE_recruiter_mcq_questions
	JOIN get_test_go_mcq_answer
		ON get_test_go_mcq_answer.question_id  = CTE_recruiter_mcq_questions.question_id
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE VIEW get_test_go_recruiter_assessment_mcq_question_with_answer
AS
	WITH CTE_recruiter_assessments AS(
		SELECT * FROM get_test_go_recruiter_assessment
	),
	CTE_recruiter_assessments_questions AS (
		SELECT
			CTE_recruiter_assessments.recruiter_id,
			CTE_recruiter_assessments.assessment_id,
			CTE_recruiter_assessments.assessment_name,
			CTE_recruiter_assessments.assessment_details,
			get_test_go_assessment_type.assessment_type_name,
			get_test_go_question.question_id,
			get_test_go_question.question_type,
			get_test_go_question.question
		FROM CTE_recruiter_assessments
		JOIN get_test_go_assessment_type
			ON CTE_recruiter_assessments.assessment_type = get_test_go_assessment_type.assessment_type_id
		JOIN get_test_go_recruiter_assessment_question
			ON CTE_recruiter_assessments.assessment_id = get_test_go_recruiter_assessment_question.assessment_id
		JOIN get_test_go_question
			ON get_test_go_recruiter_assessment_question.question_id = get_test_go_question.question_id
		WHERE get_test_go_question.question_type = 1 -- MCQ Question
	)
	SELECT 
		CTE_recruiter_assessments_questions.recruiter_id,
		CTE_recruiter_assessments_questions.assessment_name,
		CTE_recruiter_assessments_questions.assessment_details,
		CTE_recruiter_assessments_questions.assessment_type_name,
		CTE_recruiter_assessments_questions.question_id,
		get_test_go_question_type.question_type_name,
		CTE_recruiter_assessments_questions.question,
		get_test_go_mcq_answer.option_one,
		get_test_go_mcq_answer.option_two,
		get_test_go_mcq_answer.option_three,
		get_test_go_mcq_answer.option_four,
		get_test_go_mcq_answer.correct_answer
	FROM CTE_recruiter_assessments_questions
	JOIN get_test_go_mcq_answer
		ON CTE_recruiter_assessments_questions.question_id = get_test_go_mcq_answer.question_id
	JOIN get_test_go_question_type
		ON CTE_recruiter_assessments_questions.question_type = get_test_go_question_type.question_type_id;

CREATE OR REPLACE VIEW get_test_go_recruiter_assessment_tf_question_with_answer
AS
	WITH CTE_recruiter_assessments AS (
		SELECT * FROM get_test_go_recruiter_assessment
	),
	CTE_recruiter_assessments_questions AS (
		SELECT
			CTE_recruiter_assessments.recruiter_id,
			CTE_recruiter_assessments.assessment_id,
			CTE_recruiter_assessments.assessment_name,
			CTE_recruiter_assessments.assessment_details,
			get_test_go_assessment_type.assessment_type_name,
			get_test_go_question.question_id,
			get_test_go_question.question_type,
			get_test_go_question.question
		FROM CTE_recruiter_assessments
		JOIN get_test_go_assessment_type
			ON CTE_recruiter_assessments.assessment_type = get_test_go_assessment_type.assessment_type_id
		JOIN get_test_go_recruiter_assessment_question
			ON CTE_recruiter_assessments.assessment_id = get_test_go_recruiter_assessment_question.assessment_id
		JOIN get_test_go_question
			ON get_test_go_recruiter_assessment_question.question_id = get_test_go_question.question_id
		WHERE get_test_go_question.question_type = 2 -- True False Question
	)
	SELECT
		CTE_recruiter_assessments_questions.recruiter_id,
		CTE_recruiter_assessments_questions.assessment_name,
		CTE_recruiter_assessments_questions.assessment_details,
		CTE_recruiter_assessments_questions.assessment_type_name,
		CTE_recruiter_assessments_questions.question_id,
		get_test_go_question_type.question_type_name,
		CTE_recruiter_assessments_questions.question,
		get_test_go_true_false_answer.answer
	FROM CTE_recruiter_assessments_questions
	JOIN get_test_go_true_false_answer
		ON CTE_recruiter_assessments_questions.question_id = get_test_go_true_false_answer.question_id
	JOIN get_test_go_question_type
		ON CTE_recruiter_assessments_questions.question_type = get_test_go_question_type.question_type_id;

SELECT * FROM get_test_go_recruiter_assessment_mcq_question_with_answer
WHERE recruiter_id = (SELECT recruiter_id FROM get_test_go_recruiter WHERE email = 'ali@gmail.com');

SELECT * FROM get_test_go_recruiter_assessment_tf_question_with_answer
WHERE recruiter_id = (SELECT recruiter_id FROM get_test_go_recruiter WHERE email = 'ali@gmail.com');

CREATE OR REPLACE VIEW get_test_go_recruiter_job_with_type_name
AS
	SELECT 
		get_test_go_recruiter.recruiter_id,
		get_test_go_recruiter.email,
		get_test_go_recruiter_job.job_id,
		get_test_go_recruiter_job.job_name,
		get_test_go_recruiter_job.job_details,
		get_test_go_job_types.job_type_name,
		get_test_go_job_types.job_type_details
	FROM get_test_go_recruiter
	JOIN get_test_go_recruiter_job
		ON get_test_go_recruiter.recruiter_id = get_test_go_recruiter_job.recruiter_id
	JOIN get_test_go_job_types
		ON get_test_go_recruiter_job.job_type = get_test_go_job_types.job_type_id;

CREATE OR REPLACE VIEW get_test_go_recruiter_job_with_required_assessments
AS
	SELECT 
		get_test_go_recruiter.recruiter_id,
		get_test_go_recruiter.email,
		get_test_go_recruiter_job.job_id,
		get_test_go_recruiter_job.job_name,
		get_test_go_job_types.job_type_name,
		get_test_go_job_types.job_type_details,
		get_test_go_recruiter_job.job_details,
		get_test_go_recruiter_assessment.assessment_id,
		get_test_go_recruiter_assessment.assessment_name,
		get_test_go_recruiter_assessment.assessment_details
	FROM get_test_go_recruiter
	JOIN get_test_go_recruiter_job
		ON get_test_go_recruiter.recruiter_id = get_test_go_recruiter_job.recruiter_id
	JOIN get_test_go_job_types
		ON get_test_go_recruiter_job.job_type = get_test_go_job_types.job_type_id
	JOIN get_test_go_recruiter_job_assessment
		ON get_test_go_recruiter_job.job_id = get_test_go_recruiter_job_assessment.job_id
	JOIN get_test_go_recruiter_assessment
		ON get_test_go_recruiter_job_assessment.assessment_id = get_test_go_recruiter_assessment.assessment_id;
		
CREATE OR REPLACE VIEW get_test_go_recruiter_job_with_details
AS 
	SELECT
		get_test_go_recruiter.recruiter_id,
		get_test_go_recruiter.first_name,
		get_test_go_recruiter.last_name,
		get_test_go_recruiter.email,
		get_test_go_recruiter_job.job_id,
		get_test_go_recruiter_job.job_name,
		get_test_go_recruiter_job.job_details,
		get_test_go_job_types.job_type_name,
		get_test_go_job_types.job_type_details
	FROM get_test_go_recruiter
	JOIN get_test_go_recruiter_job
		ON get_test_go_recruiter.recruiter_id = get_test_go_recruiter_job.recruiter_id
	JOIN get_test_go_job_types
		ON get_test_go_recruiter_job.job_type = get_test_go_job_types.job_type_id;
		
--CREATE OR REPLACE VIEW get_test_go_candidate_job_assessment_details
--AS
--	SELECT
--		get_test_go_recruiter.recruiter_id,
--		get_test_go_recruiter.email AS recruiter_email,
--		get_test_go_candidate.candidate_id,
--		get_test_go_candidate.email AS candidate_email,
--		get_test_go_recruiter_job.job_name,
--		get_test_go_recruiter_job.job_details,
--		get_test_go_recruiter_assessment.assessment_id,
--		get_test_go_recruiter_assessment.assessment_name,
--		get_test_go_recruiter_assessment.assessment_details,
--		get_test_go_assessment_type.assessment_type_name,
--		get_test_go_assessment_type.assessment_type_details,
--		score
--	FROM get_test_go_candidate_job_assessment_score
--	JOIN get_test_go_recruiter
--		ON get_test_go_candidate_job_assessment_score.recruiter_id = get_test_go_recruiter.recruiter_id
--	JOIN get_test_go_recruiter_assessment
--		ON get_test_go_candidate_job_assessment_score.assessment_id = get_test_go_recruiter_assessment.assessment_id
--	JOIN get_test_go_assessment_type
--		ON get_test_go_recruiter_assessment.assessment_type = get_test_go_assessment_type.assessment_type_id
--	JOIN get_test_go_candidate
--		ON get_test_go_candidate_job_assessment_score.candidate_id = get_test_go_candidate.candidate_id
--	JOIN get_test_go_recruiter_job
--		ON get_test_go_candidate_job_assessment_score.job_id = get_test_go_recruiter_job.job_id
--	JOIN get_test_go_job_types
--		ON get_test_go_recruiter_job.job_type = get_test_go_job_types.job_type_id
		
SELECT * FROM get_test_go_candidate_job_assessment_score

CREATE OR REPLACE VIEW get_test_go_recruiter_assessment_count
AS
	SELECT get_test_go_recruiter.email, COUNT(*) FROM get_test_go_recruiter
	JOIN get_test_go_recruiter_assessment
		ON get_test_go_recruiter.recruiter_id = get_test_go_recruiter_assessment.recruiter_id
	GROUP BY get_test_go_recruiter.email
	
CREATE OR REPLACE VIEW get_test_go_recruiter_job_count
AS
	SELECT get_test_go_recruiter.email, COUNT(*) FROM get_test_go_recruiter
	JOIN get_test_go_recruiter_job
		ON get_test_go_recruiter_job.recruiter_id = get_test_go_recruiter.recruiter_id
	GROUP BY get_test_go_recruiter.email

CREATE OR REPLACE VIEW get_test_go_recruiter_technical_assessment_with_answers
AS SELECT get_test_go_recruiter_assessment_mcq_question_with_answer.recruiter_id,
    get_test_go_recruiter_assessment_mcq_question_with_answer.assessment_name,
    get_test_go_recruiter_assessment_mcq_question_with_answer.assessment_type_name,
    get_test_go_recruiter_assessment_mcq_question_with_answer.question_type_name,
    get_test_go_recruiter_assessment_mcq_question_with_answer.question,
    get_test_go_recruiter_assessment_mcq_question_with_answer.correct_answer
   FROM get_test_go_recruiter_assessment_mcq_question_with_answer
  ORDER BY get_test_go_recruiter_assessment_mcq_question_with_answer.question_type_name;

----------------------------------------------------------------------------------------------------------------------
-- BELOW QUERIES ARE FROM THE 'Get_test_Go_Addon' Database for IQ and EQ
----------------------------------------------------------------------------------------------------------------------

CREATE TABLE iq_question(
	question_id SERIAL PRIMARY KEY,
	question TEXT UNIQUE NOT NULL,
	option_one TEXT NOT NULL,
	option_two TEXT NOT NULL,
	option_three TEXT NOT NULL,
	option_four TEXT NOT NULL,
	correct_answer TEXT NOT NULL
);

CREATE TABLE eq_question(
	question_id SERIAL PRIMARY KEY,
	question TEXT UNIQUE NOT NULL,
	option_one TEXT NOT NULL,
	option_two TEXT NOT NULL,
	option_three TEXT NOT NULL,
	option_four TEXT NOT NULL,
	correct_answer TEXT NOT NULL
);

CREATE TABLE candidate_score(
	id SERIAL PRIMARY KEY,
	candidate_email CHARACTER VARYING NOT NULL,
	assessment_type CHARACTER VARYING NOT NULL,
	score int4 NOT NULL
);

INSERT INTO iq_question(
	question,
	option_one,
	option_two,
	option_three,
	option_four,
	correct_answer
) VALUES(
	'Insert the word that completes the first word and begins the second. Ur (. . .) Al',
	'Band',
	'Bun',
	'Bane',
	'Ban',
	'Ban'
),
(
	'Insert the missing number. Rewarded = 80 Coordinate = 75 Opinionated = ?',
	'87',
	'82',
	'88',
	'81',
	'87'
),
(
	'Insert the word that means the same as the words outside the brackets. Stake (. . . .) Mail',
	'Fast',
	'Post',
	'Past',
	'Slow',
	'Post'
),
(
	'Insert the missing number. 6 10 18 34 ?',
	'69',
	'68',
	'66',
	'61',
	'66'
),
(
	'Insert the word that means the same as the words outside the brackets. Excavation (. . .) Possession',
	'Meen',
	'Mess',
	'Man',
	'Mine',
	'Mine'
),
(
	'Insert the word that means the same as the words outside the brackets. Boat (. . . .) Skill',
	'Raft',
	'Craft',
	'Rite',
	'All of the above',
	'Craft'
),
(
	'Insert the missing word. Sting (sits) Atoms Blank (. . . .) Crams',
	'Bars',
	'Beer',
	'Bing',
	'Bang',
	'Bars'
),
(
	'Insert the word that completes the first word and begins the second. Enc (. . . ) Les',
	'Rack',
	'Losse',
	'Rust',
	'Bust',
	'Rust'
),
(
	'Underline the odd-man-out.',
	'Giraffe',
	'Herring',
	'Fox',
	'Lion',
	'Herring'
),
(
	'Insert the word that completes the first word and begins the second. Brig (. . .) Iron',
	'Nad',
	'And',
	'Rod',
	'Rig',
	'And'
);

INSERT INTO eq_question(question, option_one, option_two, option_three, option_four, correct_answer)
VALUES 
(
	'Which of the following best describes emotional intelligence?', 
	'The ability to read and understand one''s own emotions', 
	'The ability to read and understand other people''s emotions', 
	'The ability to manage one''s own emotions', 
	'All of the above', 
	'All of the above'
),
(
	'Which of the following is an example of emotional self-awareness?', 
	'Recognizing when you feel angry', 
	'Recognizing when someone else is angry', 
	'Controlling your anger when you feel it', 
	'None of the above', 
	'Recognizing when you feel angry'
),
(
	'What is empathy?', 
	'The ability to understand and share the feelings of others', 
	'The ability to control one''s own emotions', 
	'The ability to make decisions based on emotions', 
	'None of the above', 
	'The ability to understand and share the feelings of others'
),
(
	'Which of the following is an example of emotional regulation?', 
	'Taking a deep breath to calm down before responding to someone who has made you angry', 
	'Yelling at someone who has made you angry', 
	'Ignoring someone who has made you angry', 
	'None of the above', 
	'Taking a deep breath to calm down before responding to someone who has made you angry'
),
(
	'What is social awareness?', 
	'The ability to understand and navigate social situations', 
	'The ability to understand and manage one''s own emotions', 
	'The ability to understand and share the feelings of others', 
	'None of the above', 
	'The ability to understand and share the feelings of others'
),
(
	'Which of the following is an example of emotional intelligence?', 
	'Recognizing and managing your own emotions', 
	'Speaking multiple languages', 
	'Solving complex math problems', 
	'All of the above', 
	'Recognizing and managing your own emotions'
),
(
	'What is emotional management?', 
	'The ability to recognize and manage your own emotions', 
	'The ability to recognize and manage the emotions of others', 
	'The ability to understand and navigate social situations', 
	'None of the above', 
	'The ability to recognize and manage your own emotions'
),
(
	'What is emotional self-control?', 
	'The ability to regulate and manage one''s own emotions', 
	'The ability to understand and manage other people''s emotions', 
	'The ability to communicate effectively in social situations', 
	'None of the above', 
	'The ability to regulate and manage one''s own emotions'
),
(
	'What is emotional expression?', 
	'The ability to effectively communicate one''s own emotions', 
	'The ability to read and understand other people''s emotions', 
	'The ability to navigate complex social situations', 
	'None of the above', 
	'The ability to effectively communicate one''s own emotions'
),
(
	'What is emotional perception?', 
	'The ability to accurately recognize and identify emotions in oneself and others', 
	'The ability to regulate and manage one''s own emotions', 
	'The ability to communicate effectively in social situations', 
	'None of the above', 
	'The ability to accurately recognize and identify emotions in oneself and others'
);

SELECT *
FROM get_test_go_recruiter
JOIN get_test_go_recruiter_assessment
	ON get_test_go_recruiter.recruiter_id = get_test_go_recruiter_assessment.recruiter_id

----------------------------------------------------------------------------------------------------------------------
-- BELOW QUERIES ARE DUPLICATE BUT ARE COPED IN CASE IF SOMETHING IS MISSING FROM THE ABOVE CODE
----------------------------------------------------------------------------------------------------------------------

CREATE TABLE get_test_go_recruiter_assessment_question(
	recruiter_id int4 NOT NULL,
	assessment_id int4 NOT NULL,
	question_id int4 NOT NULL,
	CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES get_test_go_recruiter(recruiter_id),
	CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES get_test_go_assessment(assessment_id),
	CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES get_test_go_question(question_id)
);

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
		
CREATE TABLE get_test_go_recruiter_assessment(
	recruiter_id int4 NOT NULL,
	assessment_id serial NOT NULL,
	assessment_name TEXT UNIQUE NOT NULL,
	assessment_details TEXT DEFAULT 'No details provided',
	assessment_type int4 NOT NULL,
	CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES get_test_go_recruiter(recruiter_id),
	CONSTRAINT fk_assessment_type FOREIGN KEY (assessment_type) REFERENCES get_test_go_assessment_type(assessment_type_id)
);

CREATE OR REPLACE FUNCTION recruiter_assessment_exists(recruiter_email VARCHAR(150), name_of_assessment TEXT)
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

CREATE OR REPLACE FUNCTION assessment_question_exists(recruiter_email varchar(150), name_of_assessment TEXT, question_text TEXT)
RETURNS integer
AS $$
		DECLARE assessment_question_count integer;
		BEGIN
			SELECT COUNT(*) INTO assessment_question_count FROM get_test_go_recruiter_assessment
			JOIN get_test_go_recruiter_assessment_question
				ON get_test_go_recruiter_assessment.assessment_id = get_test_go_recruiter_assessment_question.assessment_id
			JOIN get_test_go_question
				ON get_test_go_recruiter_assessment_question.question_id = get_test_go_question.question_id
			WHERE get_test_go_recruiter_assessment.recruiter_id = (SELECT recruiter_id FROM get_test_go_recruiter WHERE email = recruiter_email)
			AND assessment_name = name_of_assessment;
		
			RETURN assessment_question_count;
		END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE create_recruiter_assessment(
	IN recruiter_email VARCHAR(150),
	IN name_of_assessment TEXT, 
	IN details_of_assessment TEXT, 
	IN type_of_assessment INT4
)
 LANGUAGE plpgsql
AS $procedure$
	begin
		INSERT INTO get_test_go_recruiter_assessment(recruiter_id, assessment_name, assessment_details, assessment_type)
		VALUES((SELECT recruiter_id FROM get_test_go_recruiter WHERE email = recruiter_email), name_of_assessment, details_of_assessment, type_of_assessment);
		commit;
	end;
$procedure$;

CREATE OR REPLACE PROCEDURE add_assessment_mcq(IN recruiter_email VARCHAR(150), IN name_of_assessment character varying, IN mcq_question text, IN option_one text, IN option_two text, IN option_three text, IN option_four text, IN correct_answer text)
LANGUAGE plpgsql
AS $procedure$
	BEGIN
		INSERT INTO get_test_go_question(question_type, question) VALUES(1, mcq_question);
		WITH CTE_recruiter_id AS(
			SELECT recruiter_id FROM get_test_go_recruiter WHERE email = recruiter_email
		)
		INSERT INTO get_test_go_recruiter_assessment_question(recruiter_id, assessment_id, question_id)
		VALUES((SELECT recruiter_id FROM CTE_recruiter_id), (SELECT assessment_id FROM get_test_go_recruiter_assessment WHERE assessment_name = name_of_assessment AND recruiter_id = (SELECT recruiter_id FROM CTE_recruiter_id)), (SELECT question_id FROM get_test_go_question WHERE question = mcq_question));		
		INSERT INTO get_test_go_mcq_answer(question_id, option_one, option_two, option_three, option_four, correct_answer)
		VALUES((SELECT question_id FROM get_test_go_question WHERE question = mcq_question), option_one, option_two, option_three, option_four, correct_answer);
		
		commit;
	end;
$procedure$;

CREATE TABLE get_test_go_recruiter_assessment_question(
	recruiter_id int4 NOT NULL,
	assessment_id int4 NOT NULL,
	question_id int4 NOT NULL,
	CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES get_test_go_recruiter(recruiter_id),
	CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES get_test_go_recruiter_assessment(assessment_id),
	CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES get_test_go_question(question_id)
);

CREATE OR REPLACE FUNCTION get_recruiter_assessment_mcq_questions(recruiter_email varchar(150), name_of_assessment TEXT)
RETURNS SETOF RECORD AS
$$
	WITH CTE_recruiter_assessments AS(
		SELECT
			*
		FROM get_test_go_recruiter_assessment
		WHERE recruiter_id = (SELECT recruiter_id FROM get_test_go_recruiter WHERE email = recruiter_email)
	),
	CTE_recruiter_assessments_questions AS (
		SELECT
			CTE_recruiter_assessments.recruiter_id,
			CTE_recruiter_assessments.assessment_id,
			CTE_recruiter_assessments.assessment_name,
			CTE_recruiter_assessments.assessment_details,
			CTE_recruiter_assessments.assessment_type,
			get_test_go_question.question_id,
			get_test_go_question.question_type,
			get_test_go_question.question
		FROM CTE_recruiter_assessments
		JOIN get_test_go_recruiter_assessment_question
			ON CTE_recruiter_assessments.assessment_id = get_test_go_recruiter_assessment_question.assessment_id
		JOIN get_test_go_question
			ON get_test_go_recruiter_assessment_question.question_id = get_test_go_question.question_id
		WHERE get_test_go_question.question_type = 1 -- MCQ Question
	)
	SELECT 
		CTE_recruiter_assessments_questions.recruiter_id,
		CTE_recruiter_assessments_questions.assessment_name,
		CTE_recruiter_assessments_questions.assessment_details,
		CTE_recruiter_assessments_questions.assessment_type,
		CTE_recruiter_assessments_questions.question_id,
		CTE_recruiter_assessments_questions.question_type,
		CTE_recruiter_assessments_questions.question,
		get_test_go_mcq_answer.option_one,
		get_test_go_mcq_answer.option_two,
		get_test_go_mcq_answer.option_three,
		get_test_go_mcq_answer.option_four,
		get_test_go_mcq_answer.correct_answer
	FROM CTE_recruiter_assessments_questions
	JOIN get_test_go_mcq_answer
		ON CTE_recruiter_assessments_questions.question_id = get_test_go_mcq_answer.question_id
$$ LANGUAGE SQL STABLE

CREATE OR REPLACE VIEW get_test_go_recruiter_assessment_mcq_question_with_answer
AS
	WITH CTE_recruiter_assessments AS(
		SELECT * FROM get_test_go_recruiter_assessment
	),
	CTE_recruiter_assessments_questions AS (
		SELECT
			CTE_recruiter_assessments.recruiter_id,
			CTE_recruiter_assessments.assessment_id,
			CTE_recruiter_assessments.assessment_name,
			CTE_recruiter_assessments.assessment_details,
			CTE_recruiter_assessments.assessment_type,
			get_test_go_question.question_id,
			get_test_go_question_type.question_type_name,
			get_test_go_question.question
		FROM CTE_recruiter_assessments
		JOIN get_test_go_recruiter_assessment_question
			ON CTE_recruiter_assessments.assessment_id = get_test_go_recruiter_assessment_question.assessment_id
		JOIN get_test_go_question
			ON get_test_go_recruiter_assessment_question.question_id = get_test_go_question.question_id
		JOIN get_test_go_question_type
			ON get_Test_go_question.question_type = get_test_go_question_type.question_type_id
		WHERE get_test_go_question.question_type = 1 -- MCQ Question
	)
	SELECT 
		CTE_recruiter_assessments_questions.recruiter_id,
		CTE_recruiter_assessments_questions.assessment_name,
		CTE_recruiter_assessments_questions.assessment_details,
		CTE_recruiter_assessments_questions.assessment_type,
		CTE_recruiter_assessments_questions.question_id,
		CTE_recruiter_assessments_questions.question_type_name,
		CTE_recruiter_assessments_questions.question,
		get_test_go_mcq_answer.option_one,
		get_test_go_mcq_answer.option_two,
		get_test_go_mcq_answer.option_three,
		get_test_go_mcq_answer.option_four,
		get_test_go_mcq_answer.correct_answer
	FROM CTE_recruiter_assessments_questions
	JOIN get_test_go_mcq_answer
		ON CTE_recruiter_assessments_questions.question_id = get_test_go_mcq_answer.question_id

CREATE OR REPLACE VIEW get_test_go_recruiter_assessment_tf_question_with_answer
AS
	WITH CTE_recruiter_assessments AS (
		SELECT * FROM get_test_go_recruiter_assessment
	),
	CTE_recruiter_assessments_questions AS (
		SELECT
			CTE_recruiter_assessments.recruiter_id,
			CTE_recruiter_assessments.assessment_id,
			CTE_recruiter_assessments.assessment_name,
			CTE_recruiter_assessments.assessment_details,
			CTE_recruiter_assessments.assessment_type,
			get_test_go_question.question_id,
			get_test_go_question_type.question_type_name,
			get_test_go_question.question
		FROM CTE_recruiter_assessments
		JOIN get_test_go_recruiter_assessment_question
			ON CTE_recruiter_assessments.assessment_id = get_test_go_recruiter_assessment_question.assessment_id
		JOIN get_test_go_question
			ON get_test_go_recruiter_assessment_question.question_id = get_test_go_question.question_id
		JOIN get_test_go_question_type
			ON get_Test_go_question.question_type = get_test_go_question_type.question_type_id
		WHERE get_test_go_question.question_type = 2 -- True False Question
	)
	SELECT
		CTE_recruiter_assessments_questions.recruiter_id,
		CTE_recruiter_assessments_questions.assessment_name,
		CTE_recruiter_assessments_questions.assessment_details,
		CTE_recruiter_assessments_questions.assessment_type,
		CTE_recruiter_assessments_questions.question_id,
		CTE_recruiter_assessments_questions.question_type_name,
		CTE_recruiter_assessments_questions.question,
		get_test_go_true_false_answer.answer
	FROM CTE_recruiter_assessments_questions
	JOIN get_test_go_true_false_answer
		ON CTE_recruiter_assessments_questions.question_id = get_test_go_true_false_answer.question_id
				
SELECT * FROM get_test_go_recruiter_assessment_mcq_question_with_answer
WHERE recruiter_id = (SELECT recruiter_id FROM get_test_go_recruiter WHERE email = 'ali@gmail.com')

CREATE OR REPLACE VIEW get_test_go_recruiter_technical_assessment_with_answers
AS
	SELECT
	recruiter_id, 
	assessment_name, 
	assessment_type_name, 
	question_type_name, 
	question,
	correct_answer
	FROM get_test_go_recruiter_assessment_mcq_question_with_answer
	ORDER BY question_type_name

----------------------------------------------------------------------------------------------------------------------
-- BELOW QUERIES ARE DUPLICATE BUT ARE COPED IN CASE IF SOMETHING IS MISSING FROM THE ABOVE CODE
----------------------------------------------------------------------------------------------------------------------

CREATE TABLE get_test_go_recruiter_assessment_question(
	recruiter_id int4 NOT NULL,
	assessment_id int4 NOT NULL,
	question_id int4 NOT NULL,
	CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES get_test_go_recruiter(recruiter_id),
	CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES get_test_go_assessment(assessment_id),
	CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES get_test_go_question(question_id)
);

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
		
CREATE TABLE get_test_go_recruiter_assessment(
	recruiter_id int4 NOT NULL,
	assessment_id serial NOT NULL,
	assessment_name TEXT UNIQUE NOT NULL,
	assessment_details TEXT DEFAULT 'No details provided',
	assessment_type int4 NOT NULL,
	CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES get_test_go_recruiter(recruiter_id),
	CONSTRAINT fk_assessment_type FOREIGN KEY (assessment_type) REFERENCES get_test_go_assessment_type(assessment_type_id)
);

CREATE OR REPLACE FUNCTION recruiter_assessment_exists(recruiter_email VARCHAR(150), name_of_assessment TEXT)
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

CREATE OR REPLACE FUNCTION assessment_question_exists(recruiter_email varchar(150), name_of_assessment TEXT, question_text TEXT)
RETURNS integer
AS $$
		DECLARE assessment_question_count integer;
		BEGIN
			SELECT COUNT(*) INTO assessment_question_count FROM get_test_go_recruiter_assessment
			JOIN get_test_go_recruiter_assessment_question
				ON get_test_go_recruiter_assessment.assessment_id = get_test_go_recruiter_assessment_question.assessment_id
			JOIN get_test_go_question
				ON get_test_go_recruiter_assessment_question.question_id = get_test_go_question.question_id
			WHERE get_test_go_recruiter_assessment.recruiter_id = (SELECT recruiter_id FROM get_test_go_recruiter WHERE email = recruiter_email)
			AND assessment_name = name_of_assessment;
		
			RETURN assessment_question_count;
		END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE create_recruiter_assessment(
	IN recruiter_email VARCHAR(150),
	IN name_of_assessment TEXT, 
	IN details_of_assessment TEXT, 
	IN type_of_assessment INT4
)
 LANGUAGE plpgsql
AS $procedure$
	begin
		INSERT INTO get_test_go_recruiter_assessment(recruiter_id, assessment_name, assessment_details, assessment_type)
		VALUES((SELECT recruiter_id FROM get_test_go_recruiter WHERE email = recruiter_email), name_of_assessment, details_of_assessment, type_of_assessment);
		commit;
	end;
$procedure$;

CREATE OR REPLACE PROCEDURE add_assessment_mcq(IN recruiter_email VARCHAR(150), IN name_of_assessment character varying, IN mcq_question text, IN option_one text, IN option_two text, IN option_three text, IN option_four text, IN correct_answer text)
LANGUAGE plpgsql
AS $procedure$
	BEGIN
		INSERT INTO get_test_go_question(question_type, question) VALUES(1, mcq_question);
		WITH CTE_recruiter_id AS(
			SELECT recruiter_id FROM get_test_go_recruiter WHERE email = recruiter_email
		)
		INSERT INTO get_test_go_recruiter_assessment_question(recruiter_id, assessment_id, question_id)
		VALUES((SELECT recruiter_id FROM CTE_recruiter_id), (SELECT assessment_id FROM get_test_go_recruiter_assessment WHERE assessment_name = name_of_assessment AND recruiter_id = (SELECT recruiter_id FROM CTE_recruiter_id)), (SELECT question_id FROM get_test_go_question WHERE question = mcq_question));		
		INSERT INTO get_test_go_mcq_answer(question_id, option_one, option_two, option_three, option_four, correct_answer)
		VALUES((SELECT question_id FROM get_test_go_question WHERE question = mcq_question), option_one, option_two, option_three, option_four, correct_answer);
		
		commit;
	end;
$procedure$;

CREATE TABLE get_test_go_recruiter_assessment_question(
	recruiter_id int4 NOT NULL,
	assessment_id int4 NOT NULL,
	question_id int4 NOT NULL,
	CONSTRAINT fk_recruiter_id FOREIGN KEY (recruiter_id) REFERENCES get_test_go_recruiter(recruiter_id),
	CONSTRAINT fk_assessment_id FOREIGN KEY (assessment_id) REFERENCES get_test_go_recruiter_assessment(assessment_id),
	CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES get_test_go_question(question_id)
);

CREATE OR REPLACE FUNCTION get_recruiter_assessment_mcq_questions(recruiter_email varchar(150), name_of_assessment TEXT)
RETURNS SETOF RECORD AS
$$
	WITH CTE_recruiter_assessments AS(
		SELECT
			*
		FROM get_test_go_recruiter_assessment
		WHERE recruiter_id = (SELECT recruiter_id FROM get_test_go_recruiter WHERE email = recruiter_email)
	),
	CTE_recruiter_assessments_questions AS (
		SELECT
			CTE_recruiter_assessments.recruiter_id,
			CTE_recruiter_assessments.assessment_id,
			CTE_recruiter_assessments.assessment_name,
			CTE_recruiter_assessments.assessment_details,
			CTE_recruiter_assessments.assessment_type,
			get_test_go_question.question_id,
			get_test_go_question.question_type,
			get_test_go_question.question
		FROM CTE_recruiter_assessments
		JOIN get_test_go_recruiter_assessment_question
			ON CTE_recruiter_assessments.assessment_id = get_test_go_recruiter_assessment_question.assessment_id
		JOIN get_test_go_question
			ON get_test_go_recruiter_assessment_question.question_id = get_test_go_question.question_id
		WHERE get_test_go_question.question_type = 1 -- MCQ Question
	)
	SELECT 
		CTE_recruiter_assessments_questions.recruiter_id,
		CTE_recruiter_assessments_questions.assessment_name,
		CTE_recruiter_assessments_questions.assessment_details,
		CTE_recruiter_assessments_questions.assessment_type,
		CTE_recruiter_assessments_questions.question_id,
		CTE_recruiter_assessments_questions.question_type,
		CTE_recruiter_assessments_questions.question,
		get_test_go_mcq_answer.option_one,
		get_test_go_mcq_answer.option_two,
		get_test_go_mcq_answer.option_three,
		get_test_go_mcq_answer.option_four,
		get_test_go_mcq_answer.correct_answer
	FROM CTE_recruiter_assessments_questions
	JOIN get_test_go_mcq_answer
		ON CTE_recruiter_assessments_questions.question_id = get_test_go_mcq_answer.question_id
$$ LANGUAGE SQL STABLE

CREATE OR REPLACE VIEW get_test_go_recruiter_assessment_mcq_question_with_answer
AS
	WITH CTE_recruiter_assessments AS(
		SELECT * FROM get_test_go_recruiter_assessment
	),
	CTE_recruiter_assessments_questions AS (
		SELECT
			CTE_recruiter_assessments.recruiter_id,
			CTE_recruiter_assessments.assessment_id,
			CTE_recruiter_assessments.assessment_name,
			CTE_recruiter_assessments.assessment_details,
			CTE_recruiter_assessments.assessment_type,
			get_test_go_question.question_id,
			get_test_go_question.question_type,
			get_test_go_question.question
		FROM CTE_recruiter_assessments
		JOIN get_test_go_recruiter_assessment_question
			ON CTE_recruiter_assessments.assessment_id = get_test_go_recruiter_assessment_question.assessment_id
		JOIN get_test_go_question
			ON get_test_go_recruiter_assessment_question.question_id = get_test_go_question.question_id
		WHERE get_test_go_question.question_type = 1 -- MCQ Question
	)
	SELECT 
		CTE_recruiter_assessments_questions.recruiter_id,
		CTE_recruiter_assessments_questions.assessment_name,
		CTE_recruiter_assessments_questions.assessment_details,
		CTE_recruiter_assessments_questions.assessment_type,
		CTE_recruiter_assessments_questions.question_id,
		CTE_recruiter_assessments_questions.question_type,
		CTE_recruiter_assessments_questions.question,
		get_test_go_mcq_answer.option_one,
		get_test_go_mcq_answer.option_two,
		get_test_go_mcq_answer.option_three,
		get_test_go_mcq_answer.option_four,
		get_test_go_mcq_answer.correct_answer
	FROM CTE_recruiter_assessments_questions
	JOIN get_test_go_mcq_answer
		ON CTE_recruiter_assessments_questions.question_id = get_test_go_mcq_answer.question_id

CREATE OR REPLACE VIEW get_test_go_recruiter_assessment_tf_question_with_answer
AS
	WITH CTE_recruiter_assessments AS (
		SELECT * FROM get_test_go_recruiter_assessment
	),
	CTE_recruiter_assessments_questions AS (
		SELECT
			CTE_recruiter_assessments.recruiter_id,
			CTE_recruiter_assessments.assessment_id,
			CTE_recruiter_assessments.assessment_name,
			CTE_recruiter_assessments.assessment_details,
			CTE_recruiter_assessments.assessment_type,
			get_test_go_question.question_id,
			get_test_go_question.question_type,
			get_test_go_question.question
		FROM CTE_recruiter_assessments
		JOIN get_test_go_recruiter_assessment_question
			ON CTE_recruiter_assessments.assessment_id = get_test_go_recruiter_assessment_question.assessment_id
		JOIN get_test_go_question
			ON get_test_go_recruiter_assessment_question.question_id = get_test_go_question.question_id
		WHERE get_test_go_question.question_type = 2 -- True False Question
	)
	SELECT
		CTE_recruiter_assessments_questions.recruiter_id,
		CTE_recruiter_assessments_questions.assessment_name,
		CTE_recruiter_assessments_questions.assessment_details,
		CTE_recruiter_assessments_questions.assessment_type,
		CTE_recruiter_assessments_questions.question_id,
		CTE_recruiter_assessments_questions.question_type,
		CTE_recruiter_assessments_questions.question,
		get_test_go_true_false_answer.answer
	FROM CTE_recruiter_assessments_questions
	JOIN get_test_go_true_false_answer
		ON CTE_recruiter_assessments_questions.question_id = get_test_go_true_false_answer.question_id
				
SELECT * FROM get_test_go_recruiter_assessment_mcq_question_with_answer
WHERE recruiter_id = (SELECT recruiter_id FROM get_test_go_recruiter WHERE email = 'ali@gmail.com')
