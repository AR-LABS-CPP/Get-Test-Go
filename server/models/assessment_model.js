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

const saveIQScore = (candidateEmail, score) => {
    return new Promise((resolve, reject) => {
        addonPool.query(`INSERT INTO candidate_score(candidate_email, assessment_type, score) VALUES('${candidateEmail}', 'IQ', '${score}')`, (error, _) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(`IQ score of ${candidateEmail} saved successfully`)
        })
    })
}

const saveEQScore = (candidateEmail, score) => {
    return new Promise((resolve, reject) => {
        addonPool.query(`INSERT INTO candidate_score(candidate_email, assessment_type, score) VALUES('${candidateEmail}', 'EQ', '${score}')`, (error, _) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(`EQ score of ${candidateEmail} saved successfully`)
        })
    })
}

const bindCandidateAndAssessment = (recruiter_email, candidate_email, job_name, scores) => {
    return new Promise((resolve, reject) => {
        for(let score of scores) {
            if(score[0] === "IQ" || score[0] === "EQ") {
                addonPool.query(`INSERT INTO candidate_score(candidate_email, assessment_type, score) VALUES('${candidate_email}', '${score[0]}', '${score[1]}')`, (error, _) => {
                    if(error) {
                        console.log(error)
                        reject(false)
                    }
                })
            }
            else {
                pool.query(`INSERT INTO get_test_go_candidate_job_assessment_score(candidate_email, recruiter_email, job_name, assessment_name, score) VALUES('${candidate_email}', '${recruiter_email}', '${job_name}', '${score[0]}', '${score[1]}')`, (error, _) => {
                    if(error) {
                        console.log(error)
                        reject(false)
                    }
                })
            }
        }

        pool.query(`INSERT INTO get_test_go_candidate_applied_job(candidate_email, job_name) VALUES('${candidate_email}', '${job_name}')`, (error, _) => {
            if(error) {
                console.log(error)
                reject(false)
            }
        })

        resolve(true)
    })
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
    console.log(recruiterEmail)
    console.log(assessmentName)
    console.log(answers)

    let score = 0

    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM get_test_go_recruiter_technical_assessment_with_answers WHERE recruiter_id = (SELECT recruiter_id FROM get_test_go_recruiter WHERE email = '${recruiterEmail}') AND assessment_name = '${assessmentName}' AND assessment_type_name = 'TECHNICAL'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            const data = results.rows

            if(data.length !== answers.length) {
                reject("Unable to calculate score")
            }

            for(let idx = 0; idx < answers.length; idx++) {
                if(data[idx].correct_answer === answers[idx]) {
                    score += 1
                }
            }

            resolve(score)
        })
    })
}

const calculateGeneralScore = (recruiterEmail, assessmentName, answers) => {
    let score = 0

    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM get_test_go_recruiter_technical_assessment_with_answers WHERE recruiter_id = (SELECT recruiter_id FROM get_test_go_recruiter WHERE email = '${recruiterEmail}') AND assessment_name = '${assessmentName}' AND assessment_type_name = 'GENERAL'`, (error, results) => {
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

const getCandidateResults = (candidateEmail) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM get_test_go_candidate_job_assessment_score WHERE candidate_email = '${candidateEmail}'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const getCandidateIQResults = (candidateEmail) => {
    return new Promise((resolve, reject) => {
        addonPool.query(`SELECT * FROM candidate_score WHERE candidate_email = '${candidateEmail}' AND assessment_type = 'IQ'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const getCandidateEQResults = (candidateEmail) => {
    return new Promise((resolve, reject) => {
        addonPool.query(`SELECT * FROM candidate_score WHERE candidate_email = '${candidateEmail}' AND assessment_type = 'EQ'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const candidateIQScoreExists = (candidateEmail) => {
    return new Promise((resolve, reject) => {
        addonPool.query(`SELECT COUNT(*) FROM candidate_score WHERE candidate_email = '${candidateEmail}' AND assessment_type = 'IQ'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows[0].count > 0)
        })
    })
}

const candidateEQScoreExists = (candidateEmail) => {
    return new Promise((resolve, reject) => {
        addonPool.query(`SELECT COUNT(*) FROM candidate_score WHERE candidate_email = '${candidateEmail}' AND assessment_type = 'EQ'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows[0].count > 0)
        })
    })
}

const getCandidateAppliedJobs = (candidateEmail) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM get_test_go_candidate_applied_job WHERE candidate_email = '${candidateEmail}'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const getCandidatesForJobs = (recruiterEmail) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM get_test_go_candidate_job_assessment_score WHERE recruiter_email = '${recruiterEmail}'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const deleteAssessmentQuestion = (questionText) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM get_test_go_question WHERE question = '${questionText}'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve("Question deleted successfully")
        })
    })
}

const getAllIQEQScores = () => {
    return new Promise((resolve, reject) => {
        addonPool.query('SELECT candidate_email, assessment_type, score FROM candidate_score', (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const getAllAssessments = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT assessment_name, assessment_details FROM get_test_go_recruiter_assessment", (error, results) => {
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
    bindCandidateAndAssessment,
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
    calculateTechnicalScore,
    calculateGeneralScore,
    getCandidateResults,
    getCandidateIQResults,
    getCandidateEQResults,
    candidateIQScoreExists,
    candidateEQScoreExists,
    getCandidateAppliedJobs,
    getCandidatesForJobs,
    saveIQScore,
    saveEQScore,
    deleteAssessmentQuestion,
    getAllIQEQScores,
    getAllAssessments
}