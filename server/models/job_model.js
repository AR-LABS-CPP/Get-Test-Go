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

module.exports = {
    getJobTypes
}