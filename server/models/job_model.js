const pool = require("../db")

const job_types_table_name = "get_test_go_job_types"

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

const addNewJob = (job_name, job_details, job_type) => {
    return new Promise((resolve, reject) => {
        pool.query(`call add_job('${job_name}', '${job_details}', '${job_type}')`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results)
        })
    })
}

const bindJobAndAssessment = (job_name, assessment_name) => {
    return new Promise((resolve, reject) => {
        pool.query(`call add_job_assessment('${job_name}', '${assessment_name}')`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results)
        })
    })
}

module.exports = {
    getJobTypes,
    addNewJob,
    bindJobAndAssessment,
}