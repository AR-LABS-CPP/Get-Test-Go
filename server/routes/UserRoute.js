const express = require("express")
const userRoute = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Mailjet = require("node-mailjet")

const userModel = require("../models/user_model")

/*  The preferable way of storing API Keys or any other sensitive
    data is to store it in environment variables but because we 
    are still testing this system, we decided to put it here as
    it will make our testing easier.
*/
const emailServiceAPIKey = "MSG9oqVVyT9n4rbyQH43svegDU4In7ix"

/*  Warning: Please store JWT_SECRET in environment variables,
    this thing is used when generating the tokens.
*/
const JWT_SECRET = "as-i-stared-into-the-abyss-of-darkness-i-saw-nothing-but-tom-and-jerry-fighting-with-each-other-while-wearing-night-vision-goggles-but-then-something-happened-something-that-i-will-never-forget"

const mailjet = Mailjet.Client.apiConnect(
    '33f061b48ef3f92f42f8e814a06108a8',
    '0a4f586ff0254df929c68d35453f65c6'
)

userRoute.post("/mail", async (req, res) => {
    const {
        recruiterEmail,
        candidateEmail,
    } = req.body

    try {
        const response = await mailjet.post('send', {version: 'v3.1'}).request({
            Messages: [
                {
                    From: {
                        Email: recruiterEmail,
                        Name: 'Get Test Go'
                    },
                    To: [
                        {
                            Email: candidateEmail,
                            Name: 'Candidate'
                        },
                    ],

                    Subject: 'Get Test Go',
                    HTMLPart: `
                        <h3>Dear Candidate</h3>, \n\n
                        The recruiter has found you interesting and \n
                        would like to discuss things further using the given email \n\n

                        Email: ${recruiterEmail}

                        Please mail the recruiter with your details and Resume.
                    `
                }
            ]
        })

        console.log(response)

        res.status(200).send("Email sent successfully!")
    }
    catch(err) {
        res.status(500).send("Error sending email")
    }
})

userRoute.post("/users", (req, res) => {
    userModel.getUsers(req.body.userType).then(response => {
        res.status(200).send(response)
    }).catch(error => {
        res.status(500).send(error)
    })
})

userRoute.post("/user/get", (req, res) => {
    userModel.getUser(req.body.userType, req.body.email).then(response => {
        if(response === false) {
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
        if(response) {
            res.status(409).send("Account already exists with the given email")
        }
        else {
            bcrypt.hash(req.body.password, 10, (err, hashed) => {
                if(err) {
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
        if(!response) {
            res.status(404).send("Email or password is incorrect")
        }
        else {
            bcrypt.compare(req.body.password, response[0].password, (err, result) => {
                if(err) {
                    res.status(500).send(err)
                }
                else if(result === false) {
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

userRoute.post("/user/validate_email", (req, res) => {
    fetch(`https://api.apilayer.com/email_verification/check?email=${req.body.email}`, {
        method: "GET",
        redirect: "follow",
        headers: {
            "apikey": emailServiceAPIKey
        }
    }).then(response => response.json()).then(result => {
        res.status(200).send(result)
    }).catch(error => {
        res.status(500).send(error)
    })
})

module.exports = userRoute