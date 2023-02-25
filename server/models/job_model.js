const pool = require("../db")

const job_types_table_name = "get_test_go_job_types"
const recruiter_job_table_name = "get_test_go_recruiter_job"

const getAllJobs = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM get_test_go_recruiter_job_with_details', (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }
    
            resolve(results.rows)
        })
    })
}

const getJobTypes = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT job_type_name, job_type_details FROM ${job_types_table_name}`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const addNewJob = (recruiter_email, job_name, job_details, job_type, requiredAssessments) => {
    return new Promise((resolve, reject) => {
        pool.query(`call add_recruiter_job('${recruiter_email}', '${job_name}', '${job_details}', '${job_type}')`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            for(let idx = 0; idx < requiredAssessments.length; idx++) {
                bindJobAndAssessment(
                    recruiter_email, 
                    job_name, 
                    requiredAssessments[idx]
                ).catch(error => {
                    reject(error)
                })
            }

            resolve(results)
        })
    })
}

const jobAlreadyExists = (recruiter_email, job_name) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT COUNT(*) FROM get_test_go_recruiter_job WHERE recruiter_id = (SELECT recruiter_id FROM get_test_go_recruiter WHERE email = '${recruiter_email}') AND job_name = '${job_name}'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows[0].count > 0)
        })
    })
}

const bindJobAndAssessment = (recruiter_email, job_name, assessment_name) => {
    return new Promise((resolve, reject) => {
        pool.query(`call add_recruiter_job_assessment('${recruiter_email}', '${job_name}', '${assessment_name}')`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results)
        })
    })
}

const getRecruiterJobs = (recruiter_email) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM get_test_go_recruiter_job_with_type_name WHERE email = '${recruiter_email}'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

const getJobDetails = (job_name, recruiter_email) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM get_test_go_recruiter_job_with_required_assessments WHERE email = '${recruiter_email}' AND job_name = '${job_name}'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
}

module.exports = {
    getJobTypes,
    getAllJobs,
    addNewJob,
    bindJobAndAssessment,
    jobAlreadyExists,
    getRecruiterJobs,
    getJobDetails
}