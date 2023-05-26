const express = require("express")
const userRoute = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mailGen = require('mailgen')
const nodeOutlook = require('nodejs-nodemailer-outlook')

const userModel = require("../models/user_model")

/*  The preferable way of storing API Keys or any other sensitive
    data is to store it in environment variables.
*/
const emailServiceAPIKey = "MSG9oqVVyT9n4rbyQH43svegDU4In7ix"

/*  Warning: Please store JWT_SECRET in environment variables,
    this thing is used when generating the tokens.
*/
const JWT_SECRET = "as-i-stared-into-the-abyss-of-darkness-i-saw-nothing-but-tom-and-jerry-fighting-with-each-other-while-wearing-night-vision-goggles-but-then-something-happened-something-that-i-will-never-forget"

const sendEmail = async (jobName, fromEmail, toEmail, subject) => {
    const MailGenerator = new mailGen({
        theme: "default",
        product : {
            name: "Get Test Go Team",
            link: 'localhost:5173'
        }
    })

    const emailInput = {
        body : {
            greeting: "Dear",
            name: "Candidate",
            intro : `The recruiter wants to connect with you for the ${jobName} job`,
            outro: `Please send your updated resume and any other details that you think may be necessary to ${fromEmail}`,
            signature: "Best Regards"
        }
    }

    const emailBody = MailGenerator.generate(emailInput)

    nodeOutlook.sendEmail({
        auth: {
            user: 'GetTestGo@outlook.com',
            pass: '809C699b02489513'
        },
        from: 'GetTestGo@outlook.com',
        to: toEmail,
        subject: subject,
        html: emailBody,
        onError: (err) => console.log(err),
        onSuccess: (info) => console.log(info)
    })
}

userRoute.post("/mail", async (req, res) => {
    const {
        recruiterEmail,
        candidateEmail,
        jobName
    } = req.body

    sendEmail(jobName, recruiterEmail, candidateEmail, "Get Test Go")

    setTimeout(() => {
        res.status(200).send("Email sent successfully")
    }, 4000)
})

const verifyEmail = (req, res, next) => {
    fetch(`https://api.apilayer.com/email_verification/check?email=${req.body.email}`, {
        method: "GET",
        redirect: "follow",
        headers: {
            "apikey": emailServiceAPIKey
        }
    }).then(response => response.json()).then(result => {
        if (result.mx_found && result.smtp_check && !result.disposable) {
            next()
        }
        else {
            res.status(422).send("Invalid email, please try again")
        }
    }).catch(error => {
        res.status(500).send(error)
    })
}

userRoute.post("/users", (req, res) => {
    userModel.getUsers(req.body.userType).then(response => {
        res.status(200).send(response)
    }).catch(error => {
        res.status(500).send(error)
    })
})

userRoute.post("/user/get", (req, res) => {
    userModel.getUser(req.body.userType, req.body.email).then(response => {
        if (response === false) {
            res.status(404).send("Email or password is incorrect")
        }
        else {
            res.status(200).send(response)
        }
    }).catch(error => {
        res.status(500).send(error)
    })
})

userRoute.post("/user/register", (req, res) => {
    userModel.emailExists(req.body.email, req.body.userType).then(response => {
        // Response is boolean indicating whether the email exists or not
        if (response) {
            res.status(409).send("Account already exists with the given email")
        }
        else {
            bcrypt.hash(req.body.password, 10, (err, hashed) => {
                if (err) {
                    res.status(500).send(err)
                }
                else {
                    userModel.createUser(req.body.userType, req.body.firstName, req.body.lastName, req.body.email, hashed).then(response => {
                        res.status(200).send(response)
                    }).catch(error => {
                        res.status(500).send(error)
                    })
                }
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
})

userRoute.post("/user/login", (req, res) => {
    userModel.getUser(req.body.userType, req.body.email).then(response => {
        // Response is null if the user is not in the database
        if (!response) {
            res.status(404).send("Email or password is incorrect")
        }
        else {
            bcrypt.compare(req.body.password, response[0].password, (err, result) => {
                if (err) {
                    res.status(500).send(err)
                }
                else if (result === false) {
                    res.status(401).send("Email or password is incorrect")
                }
                else {
                    const token = jwt.sign({
                        firstName: response[0].first_name,
                        lastName: response[0].last_name,
                        email: req.body.email,
                        userType: req.body.userType
                    }, JWT_SECRET)

                    res.status(200).send(token)
                }
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
})

userRoute.post("/recruiter/stats", async (req, res) => {
    let recruiterStats = []

    try {
        const assessmentCount = await userModel.getRecruiterAssessmentCount(req.body.recruiterEmail)
        const jobCount = await userModel.getRecruiterJobCount(req.body.recruiterEmail)

        console.log(assessmentCount)
        console.log(jobCount)

        recruiterStats.push(assessmentCount)
        recruiterStats.push(jobCount)

        res.status(200).send(recruiterStats)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

userRoute.get("/recruiters", async (req, res) => {
    try {
        const recruiters = await userModel.getUsers("RECRUITER")

        const convertedData = Object.values(recruiters).map(obj => Object.values(obj));

        res.status(200).send(convertedData)
    }
    catch(err) {
        res.status(500).send(err)
    }
})

userRoute.get("/candidates", async (req, res) => {
    try {
        const recruiters = await userModel.getUsers("CANDIDATE")

        const convertedData = Object.values(recruiters).map(obj => Object.values(obj));

        res.status(200).send(convertedData)
    }
    catch(err) {
        res.status(500).send(err)
    }
})

userRoute.get("/system_stats", async (req, res) => {
    try {
        const recruiterCount = await userModel.getRecruiterCount()
        const candidateCount = await userModel.getCandidateCount()
        const jobCount = await userModel.getJobCount()
        const assessmentCount = await userModel.getAssessmentCount()
        const iqQuestionsCount = await userModel.getIqQuestionCount()
        const eqQuestionsCount = await userModel.getEqQuestionCount()

        res.status(200).send({
            recruiterCount: recruiterCount,
            candidateCount: candidateCount,
            jobCount: jobCount,
            assessmentCount: assessmentCount,
            iqQuestionsCount: iqQuestionsCount,
            eqQuestionsCount: eqQuestionsCount
        })
    }
    catch(err) {
        res.status(500).send(err)
    }
})

module.exports = userRoute