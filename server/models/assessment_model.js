const pool = require("../db")

// TABLES
const assessment_type_table_name = "get_test_go_assessment_type"
const recruiter_assessment_table_name = "get_test_go_recruiter_assessment"
const question_type_table_name = "get_test_go_question_type"

// VIEWS
const assessment_with_questions_view_name = "get_test_go_assessment_with_question"

const getAssessmentTypes = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT assessment_type_name, assessment_type_details FROM ${assessment_type_table_name}`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const getAssessmentId = (assessmentName) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT assessment_id FROM ${recruiter_assessment_table_name} WHERE assessment_name = '${assessmentName}'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const getQuestionTypes = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT question_type_name FROM ${question_type_table_name}`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const addNewAssessment = (assessment_name, assessment_details, assessment_type) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO ${recruiter_assessment_table_name}(assessment_name, assessment_details, assessment_type) VALUES('${assessment_name}', '${assessment_details}', '${assessment_type}')`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results)
        })
    })
}

const bindRecruiterAndAssessment = (recruiter_email, assessment_name) => {
    return new Promise((resolve, reject) => {
        pool.query(`call bind_recruiter_and_assessment('${recruiter_email}', '${assessment_name}')`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results)
        })
    })
}

const bindCandidateAndAssessment = (candidate_email, assessment_name) => {
    // Gonna do it later
}

const recruiterAssessmentExists = (recruiter_email, assessment_name) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM recruiterAssessmentExists('${recruiter_email}', '${assessment_name}')`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows[0].recruiterassessmentexists > 0)
        })
    })
}

const getRecruiterAssessments = (recruiter_email) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT assessment_name, assessment_details FROM get_test_go_assessments_of_recruiter WHERE email = '${recruiter_email}'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const addMCQ = (assessmentName, mcq_question, option_one, option_two, option_three, option_four, correct_answer) => {
    return new Promise((resolve, reject) => {
        pool.query(`call add_assessment_mcq('${assessmentName}', '${mcq_question}', '${option_one}', '${option_two}', '${option_three}', '${option_four}', '${correct_answer}')`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results)
        })
    })
}

const addTrueFalse = (assessmentName, true_false_question, answer) => {
    return new Promise((resolve, reject) => {
        pool.query(`call add_assessment_true_false('${assessmentName}', '${true_false_question}', ${answer})`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results)
        })
    })
}

const assessmentExists = (assessmentName) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${assessment_table_name} WHERE assessment_name = '${assessmentName}'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            // If the row count is greater than 0
            // then that means the assessment with
            // same name already exists .
            resolve(results.rowCount > 0)
        })
    })
}

const assessmentQuestionExists = (assessment_name, question) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT COUNT(*) FROM ${assessment_with_questions_view_name} WHERE assessment_name = '${assessment_name}' AND question ILIKE '${question}'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }
            
            // An array is returned with an object having the count
            resolve(results.rows[0].count > 0)
        })
    })
}

const getAssessmentQuestions = (assessment_name) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT question_id, question FROM ${assessment_with_questions_view_name} WHERE assessment_name = ${assessment_name}`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

module.exports = {
    getAssessmentTypes,
    getQuestionTypes,
    getAssessmentId,
    addNewAssessment,
    bindRecruiterAndAssessment,
    recruiterAssessmentExists,
    getRecruiterAssessments,
    addMCQ,
    addTrueFalse,
    assessmentExists,
    assessmentQuestionExists
}