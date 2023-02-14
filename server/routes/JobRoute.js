const express = require("express")
const jobRoute = express.Router()

const jobModel = require("../models/job_model.js")

jobRoute.get("/types", (_, res) => {
    jobModel.getJobTypes().then(response => {
        res.status(200).send(response)
    }).catch(error => {
        res.status(500).send(error)
    })
})

jobRoute.post("/new", (req, res) => {
    
})

module.exports = jobRoute