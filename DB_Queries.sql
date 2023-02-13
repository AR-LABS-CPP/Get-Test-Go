create table get_test_go_assessment_type(
	assessment_type_id serial primary key,
	assessment_type_name varchar(255) unique not null,
	assessment_type_details text not null
);

create table get_test_go_assessment(
	assessment_id serial primary key,
	assessment_name varchar(100) unique not null,
	assessment_details text not null,
	assessment_type int4,
	constraint fk_assessment_type foreign key(assessment_type) references get_test_go_assessment_type(assessment_type_id)
);

create table get_test_go_question_type(
	question_type_id serial primary key,
	question_type_name varchar(100) not null
);

create table get_test_go_question(
	question_id serial primary key,
	question_type int4,
	question text unique not null,
	constraint fk_question_type foreign key(question_type) references get_test_go_question_type(question_type_id)
);

create table get_test_go_mcq_answer(
	mcq_id serial primary key,
	question_id int4,
	option_one text not null,
	option_two text not null,
	option_three text not null,
	option_four text not null,
	correct_answer text not null,
	constraint fk_question_id foreign key(question_id) references get_test_go_question(question_id)
);

create table get_test_go_true_false_answer(
	true_false_id serial primary key,
	question_id int4,
	answer bool not null,
	constraint fk_question_id foreign key(question_id) references get_test_go_question(question_id)
);

create table get_test_go_assessment_question(
	assessment_question_id serial primary key,
	assessment_id int4,
	question_id int4,
	constraint fk_assessment_id foreign key(assessment_id) references get_test_go_assessment(assessment_id),
	constraint fk_question_id foreign key(question_id) references get_test_go_question(question_id)
);

create or replace procedure add_assessment_mcq(
	name_of_assessment varchar(100),
	mcq_question text,
	option_one text,
	option_two text,
	option_three text,
	option_four text,
	correct_answer text
) language plpgsql as
$$
	begin
		insert into get_test_go_question(question_type, question) values(1, mcq_question);
		insert into get_test_go_assessment_question(assessment_id, question_id) 
			values((select assessment_id from get_test_go_assessment where assessment_name = name_of_assessment), (select question_id from get_test_go_question where question = mcq_question));
		insert into get_test_go_mcq_answer(question_id, option_one, option_two, option_three, option_four, correct_answer)
			values((select question_id from get_test_go_question where question = mcq_question), option_one, option_two, option_three, option_four, correct_answer);
		
		commit;
	end;
$$;

create or replace procedure add_assessment_true_false(
	name_of_assessment varchar(100),
	true_false_question text,
	answer bool
) language plpgsql as
$$
	begin
		insert into get_test_go_question(question_type, question) values(2, true_false_question);
		insert into get_test_go_assessment_question(assessment_id, question_id)
			values((select assessment_id from get_test_go_assessment where assessment_name = name_of_assessment), (select question_id from get_test_go_question where question = true_false_question));
		insert into get_test_go_true_false_answer(question_id, answer)
			values((select question_id from get_test_go_question where question = true_false_question), answer);
		
		commit;
	end;
$$;

create or replace procedure assessment_question_exists(
	name_of_assessment varchar(100),
	question_text text
) language plpgsql as
$$
	begin
		
				
		commit;
	end;
$$;

insert into get_test_go_assessment_type(assessment_type_name, assessment_type_details)
values('GENERAL', 'general tests can include IQ test, EQ test etc.');

insert into get_test_go_assessment_type(assessment_type_name, assessment_type_details)
values('TECHNICAL', 'technical tests can include any type of test that has some technicality in it e.g. C++, Python etc.');

truncate table get_test_go_question;
truncate table get_test_go_assessment_question;
truncate table get_test_go_mcq_answer;
truncate table get_test_go_true_false_answer;

drop procedure add_assessment_mcq;
drop procedure add_assessment_true_false ;

create view get_test_go_assessment_with_question
as
	select get_test_go_assessment.assessment_id, assessment_name, get_test_go_question.question_id, question 
	from get_test_go_assessment
	join get_test_go_assessment_question
		on get_test_go_assessment_question.assessment_id = get_test_go_assessment.assessment_id
	join get_test_go_question
		on get_test_go_assessment_question.question_id = get_test_go_question.question_id
		
select * from get_test_go_assessment_with_question
where question ilike 'what kind of programming language is Python?'