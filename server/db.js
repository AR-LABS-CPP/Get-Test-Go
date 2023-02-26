const PgPool = require("pg").Pool

const pool = new PgPool({
    user: "postgres",
    host: "localhost",
    database: "Get_Test_Go_DB",
    password: "root",
    port: 5432
})

const addonPool = new PgPool({
    user: "postgres",
    host: "localhost",
    database: "Get_Test_Go_Addon",
    password: "root",
    port: 5432
})

module.exports = {
    pool,
    addonPool
}