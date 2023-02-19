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
                req.body.jobType
            ).then(response => {
                res.status(200).send(response)
            }).catch(error => {
                res.status(500).send(error)
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })

    // jobModel.jobAlreadyExists(req.body.jobName).then(response => {
    //     if(response === false) {
    //         jobModel.addNewJob(req.body.jobName, req.body.jobDetails, req.body.jobType).then(_ => {
    //             for(let idx = 0; idx < req.body.requiredAssessments.length; idx++) {
    //                 console.log(req.body.requiredAssessments[idx])
    //                 jobModel.bindJobAndAssessment(req.body.jobName, req.body.requiredAssessments[idx]).catch(error => {
    //                     console.log(error)
    //                 })
    //             }
        
    //             res.status(200).send('Job created successfully')
    //         }).catch(error => {
    //             res.status(500).send(error)
    //         })
    //     }
    //     else {
    //         res.status(409).send("Job already exists")
    //     }
    // }).catch(error => {
    //     res.status(500).send(error)
    // })
})

module.exports = jobRoute