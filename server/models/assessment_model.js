const { pool } = require("../db")
const { addonPool } = require("../db")

// TABLES
const assessment_type_table_name = "get_test_go_assessment_type"
const recruiter_table_name = "get_test_go_recruiter"
const recruiter_assessment_table_name = "get_test_go_recruiter_assessment"
const question_type_table_name = "get_test_go_question_type"

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
        pool.query(`SELECT * FROM recruiter_assessment_exists('${recruiter_email}', '${assessment_name}')`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows[0].recruiter_assessment_exists > 0)
        })
    })
}

const getRecruiterAssessments = (recruiter_email) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT assessment_name, assessment_details, assessment_type_name FROM get_test_go_recruiter_assessment
                    JOIN get_test_go_assessment_type
                        ON get_test_go_recruiter_assessment.assessment_type = get_test_go_assessment_type.assessment_type_id
                    WHERE recruiter_id = (SELECT recruiter_id FROM ${recruiter_table_name} WHERE email = '${recruiter_email}')`, 
            (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const addMCQ = (recruiterEmail, assessmentName, mcq_question, option_one, option_two, option_three, option_four, correct_answer) => {
    return new Promise((resolve, reject) => {
        pool.query(`call add_assessment_mcq('${recruiterEmail}', '${assessmentName}', '${mcq_question}', '${option_one}', '${option_two}', '${option_three}', '${option_four}', '${correct_answer}')`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results)
        })
    })
}

const addTrueFalse = (recruiterEmail, assessmentName, true_false_question, answer) => {
    return new Promise((resolve, reject) => {
        pool.query(`call add_assessment_true_false('${recruiterEmail}', '${assessmentName}', '${true_false_question}', ${answer})`, (error, results) => {
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

const assessmentQuestionExists = (recruiter_email, assessment_name, question) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM assessment_question_exists('${recruiter_email}', '${assessment_name}', '${question}')`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }
            
            // An array is returned with an object having the count
            // resolve(results.rows[0].count > 0)
            resolve(results.rows[0].assessment_question_exists > 0)
        })
    })
}

const getRecruiterAssessmentMCQQuestions = (recruiter_email, assessment_name) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM get_test_go_recruiter_assessment_mcq_question_with_answer WHERE recruiter_id = (SELECT recruiter_id FROM get_test_go_recruiter WHERE email = '${recruiter_email}') AND assessment_name = '${assessment_name}'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const getRecruiterAssessmentTrueFalseQuestions = (recruiter_email, assessment_name) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM get_test_go_recruiter_assessment_tf_question_with_answer WHERE recruiter_id = (SELECT recruiter_id FROM get_test_go_recruiter WHERE email = '${recruiter_email}') AND assessment_name = '${assessment_name}'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const createRecruiterAssessment = (recruiterEmail, assessmentName, assessmentDetails, assessmentType) => {
    return new Promise((resolve, reject) => {
        pool.query(`call create_recruiter_assessment('${recruiterEmail}', '${assessmentName}', '${assessmentDetails}', ${assessmentType})`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results)
        })
    })
}

const getIQQuestions = () => {
    return new Promise((resolve, reject) => {
        addonPool.query('SELECT * FROM iq_question', (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const getEQQuestions = () => {
    return new Promise((resolve, reject) => {
        addonPool.query('SELECT * FROM eq_question', (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const calculateScore = (answers, tableName) => {
    let score = 0

    return new Promise((resolve, reject) => {
        addonPool.query(`SELECT correct_answer FROM ${tableName}`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }
    
            if(results.rows.length !== answers.length) {
                reject("Unable to calculate score")
            }

            for(let idx = 0; idx < answers.length; idx++) {
                if(results.rows[idx].correct_answer === answers[idx]) {
                    score += 1
                }
            }

            resolve(score)
        })
    })
}

const calculateIQScore = (answers) => {
    return new Promise((resolve, reject) => {
        calculateScore(answers, "iq_question")
            .then(response => { resolve(response) })
            .catch(error => { reject(error) })
    })
}

const calculateEQScore = (answers) => {
    return new Promise((resolve, reject) => {
        calculateScore(answers, "eq_question")
            .then(response => { resolve(response) })
            .catch(error => { reject(error) })
    })
}

const calculateTechnicalScore = (recruiterEmail, assessmentName, answers) => {
    let score = 0

    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM get_test_go_recruiter_technical_assessment_with_answers WHERE recruiter_id = (SELECT recruiter_id FROM get_test_go_recruiter WHERE email = '${recruiterEmail}') AND assessment_name = '${assessmentName}'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            if(results.rows.length !== answers.length) {
                reject("Unable to calculate score")
            }

            for(let idx = 0; idx < answers.length; idx++) {
                if(results.rows[idx].question_type_name === "TrueFalse") {
                    // If the user selected true and the answers from the database in string format is "true"
                    if(answers[idx] === true && results.rows[idx].correct_answer === "true") {
                        score += 1
                    }
                    else if(answers[idx] === false && results.rows[idx].correct_answer === "false") {
                        score += 1
                    }
                }
                else {
                    if(results.rows[idx].correct_answer === answers[idx]) {
                        score += 1
                    }
                }
            }

            resolve(score)
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
    assessmentQuestionExists,
    createRecruiterAssessment,
    getRecruiterAssessmentMCQQuestions,
    getRecruiterAssessmentTrueFalseQuestions,
    getIQQuestions,
    getEQQuestions,
    calculateIQScore,
    calculateEQScore,
    calculateTechnicalScore
}