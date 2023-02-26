const {pool} = require("../db")

const setTableName = (user) => {
    if(user === "RECRUITER") {
        return "get_test_go_recruiter"
    }
    else if(user === "CANDIDATE") {
        return "get_test_go_recruiter"
    }

    return ""
}

const getUsers = (userType) => {
    let table_name = setTableName(userType)

    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table_name}`, (error, results) => {
            if(error) {
                console.log(error)
                reject(error)
            }

            resolve(results.rows)
        })
    })
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

module.exports = {
    getUsers,
    getUser,
    emailExists,
    createUser,
}