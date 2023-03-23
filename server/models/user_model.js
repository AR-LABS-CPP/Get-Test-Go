const {pool, addonPool} = require("../db")

const setTableName = (user) => {
    if(user === "RECRUITER") {
        return "get_test_go_recruiter"
    }
    else if(user === "CANDIDATE") {
        return "get_test_go_candidate"
    }

    return ""
}

const getUsers = (userType) => {
    if(userType === "RECRUITER") {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT recruiter_id, first_name, last_name, email FROM get_test_go_recruiter`, (error, results) => {
                if(error) {
                    console.log(error)
                    reject(error)
                }
    
                resolve(results.rows)
            })
        })
    }
    else if(userType === "CANDIDATE") {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT candidate_id, first_name, last_name, email FROM get_test_go_candidate`, (error, results) => {
                if(error) {
                    console.log(error)
                    reject(error)
                }
    
                resolve(results.rows)
            })
        })
    }
}

const getUser = (userType, email) => {
    let table_name = ""

    if(userType === "RECRUITER") {
        table_name = "get_test_go_recruiter"
    }
    else if(userType === "CANDIDATE") {
        table_name = "get_test_go_candidate"
    }
    
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table_name} WHERE email = ($1)`, [email], (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            if(results.rowCount > 0) {
                resolve(results.rows)
            }
            else {
                resolve(null)
            }
        })
    })
}

const emailExists = (email, userType) => {
    let sql_query = ""

    if(userType === "RECRUITER") {
        sql_query = "SELECT * FROM get_test_go_recruiter WHERE email = ($1)"
    }
    else if(userType === "CANDIDATE") {
        sql_query = "SELECT * FROM get_test_go_candidate WHERE email = ($1)"
    }

    return new Promise((resolve, reject) => {
        pool.query(sql_query, [email], (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            // A user is found with the given email
            if(results.rowCount > 0) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        })
    })
}

const createUser = (userType, firstName, lastName, email, password) => {
    let sql_query = ""

    if(userType === "RECRUITER") {
        sql_query = "INSERT INTO get_test_go_recruiter(first_name, last_name, email, password) VALUES($1, $2, $3, $4)"
    }
    else if(userType === "CANDIDATE") {
        sql_query = "INSERT INTO get_test_go_candidate(first_name, last_name, email, password) VALUES($1, $2, $3, $4)"
    }

    return new Promise((resolve, reject) => {
        pool.query(sql_query,
        [firstName, lastName, email, password],
        (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results)
        })
    })
}

const getRecruiterAssessmentCount = (email) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM get_test_go_recruiter_assessment_count WHERE email = '${email}'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            if(results.rows[0]) {
                resolve({
                    assessmentCount: results.rows[0]
                })
            }
            else {
                resolve({
                    assessmentCount: 0
                })
            }
        })
    })
}

const getRecruiterJobCount = (email) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM get_test_go_recruiter_job_count WHERE email = '${email}'`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }
            
            if(results.rows[0]) {
                resolve({
                    jobCount: results.rows[0]
                })
            }
            else {
                resolve({
                    jobCount: 0
                })
            }
        })
    })
}

const getRecruiterCount = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT COUNT(*) FROM get_test_go_recruiter", (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows[0].count)
        })
    })
}

const getCandidateCount = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT COUNT(*) FROM get_test_go_candidate", (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows[0].count)
        })
    })
}

const getAssessmentCount = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT COUNT(*) FROM get_test_go_recruiter_assessment", (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows[0].count)
        })
    })
}

const getJobCount = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT COUNT(*) FROM get_test_go_recruiter_job", (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows[0].count)
        })
    })
}

const getIqQuestionCount = () => {
    return new Promise((resolve, reject) => {
        addonPool.query("SELECT COUNT(*) FROM iq_question", (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows[0].count)
        })
    })
}

const getEqQuestionCount = () => {
    return new Promise((resolve, reject) => {
        addonPool.query("SELECT COUNT(*) FROM eq_question", (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows[0].count)
        })
    })
}

module.exports = {
    getUsers,
    getUser,
    emailExists,
    createUser,
    getRecruiterAssessmentCount,
    getRecruiterJobCount,
    getRecruiterCount,
    getCandidateCount,
    getAssessmentCount,
    getJobCount,
    getIqQuestionCount,
    getEqQuestionCount
}