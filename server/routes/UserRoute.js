const express = require("express")
const userRoute = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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