/*
    Initial-Creation: 20-October-2022
    Latest-Modification-Date: 11-December-2022

    Programmers: 
        Aliraza, Zakaria
        
    TODO:
        * Nothing
*/

const express = require("express")
const cors = require("cors")

const userRouter = require("./routes/UserRoute")
const assessmentsRouter = require("./routes/AssessmentsRoute")
const jobRouter = require('./routes/JobRoute')

const app = express()
const port = 4321

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors())

app.use((req, _, next) => {
    console.log("HTTP Request", req.method, req.url, req.body)
    next()
})

app.get("/", (_, res) => {
    res.status(200).send("GetTestGo back-end server")
})

app.use("/", userRouter)
app.use("/assessment", assessmentsRouter)
app.use("/job", jobRouter)

app.listen(port, () => {
    console.log(`GetTestGo server running on port:${port}`)
})