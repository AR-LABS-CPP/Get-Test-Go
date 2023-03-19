const express = require("express")
const jobRoute = express.Router()

const jobModel = require("../models/job_model.js")
const assessmentModel = require("../models/assessment_model.js")
const userModel = require("../models/user_model.js")

jobRoute.get("/types", (_, res) => {
    jobModel.getJobTypes().then(response => {
        res.status(200).send(response)
    }).catch(error => {
        res.status(500).send(error)
    })
})

jobRoute.post("/all", (req, res) => {
    userModel.emailExists(req.body.candidateEmail).then(_ => {
        jobModel.getAllJobs().then(jobs => {
            assessmentModel.getCandidateAppliedJobs(req.body.candidateEmail).then(appliedJobs => {
                let unappliedJobs = []

                for(let job of jobs) {
                    for(let appliedJob of appliedJobs) {
                        if(appliedJob.job_name !== job.job_name) {
                            unappliedJobs.push(job)
                        }
                    }
                }

                res.status(200).send(unappliedJobs)
            }).catch(error => {
                res.status(500).send(error)
            })

        }).catch(error => {
            res.status(500).send(error)
        })
    })
})

jobRoute.post("/new", (req, res) => {
    jobModel.jobAlreadyExists(req.body.recruiterEmail, req.body.jobName).then(response => {
        if (response) {
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

jobRoute.post("/applied", (req, res) => {
    userModel.emailExists(req.body.candidateEmail).then(_ => {
        jobModel.getAllJobs().then(jobs => {
            assessmentModel.getCandidateAppliedJobs(req.body.candidateEmail).then(appliedJobs => {
                let candidateAppliedJobs = []

                for(let job of jobs) {
                    for(let appliedJob of appliedJobs) {
                        if(appliedJob.job_name === job.job_name) {
                            candidateAppliedJobs.push(job)
                        }
                    }
                }

                res.status(200).send(candidateAppliedJobs)
            }).catch(error => {
                res.status(500).send(error)
            })

        }).catch(error => {
            res.status(500).send(error)
        })
    })
})

jobRoute.post("/recruiter/jobs", (req, res) => {
    jobModel.getRecruiterJobs(req.body.recruiter_email).then(response => {
        res.status(200).send(response)
    }).catch(error => {
        res.status(500).send(error)
    })
})

jobRoute.post("/assessments/questions", async (req, res) => {
    let assessmentQuestions = []

    const recruiterJobAssessments = await jobModel.getRecruiterJobAssessments(req.body.recruiterEmail, req.body.jobName)

    for(let assessment of recruiterJobAssessments) {
        const recruiterJobAssessmentMCQQuestions = await assessmentModel.getRecruiterAssessmentMCQQuestions(req.body.recruiterEmail, assessment.assessment_name)
        
        if(recruiterJobAssessmentMCQQuestions) {
            assessmentQuestions.push([...recruiterJobAssessmentMCQQuestions])
        }
    }

    if(assessmentQuestions.length !== 0) {
        res.status(200).send(assessmentQuestions)
    }
    else {
        console.log(assessmentQuestions)
        res.status(500).send("Unable to fetch questions")
    }
})

jobRoute.post("/recruiter/details", (req, res) => {
    jobModel.getJobDetails(req.body.jobName, req.body.recruiterEmail).then(response => {
        res.status(200).send(response)
    }).catch(error => {
        res.status(500).send(error)
    })
})

module.exports = jobRoute