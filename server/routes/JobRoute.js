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
    jobModel.jobAlreadyExists(req.body.recruiterEmail, req.body.jobName).then(response => {
        if(response) {
            res.status(409).send("A job with the same name already exists")
        }
        else {
            jobModel.addNewJob(
                req.body.recruiterEmail,
                req.body.jobName,
                req.body.jobDetails,
                req.body.jobType,
                req.body.requiredAssessments
            ).then(_ => {
                res.status(200).send("Job created successfully")
            }).catch(error => {
                res.status(500).send(error)
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
})

jobRoute.post("/recruiter/jobs", (req, res) => {
    jobModel.getRecruiterJobs(req.body.recruiterEmail).then(response => {
        res.status(200).send(response)
    }).catch(error => {
        res.status(500).send(error)
    })
})

module.exports = jobRoute