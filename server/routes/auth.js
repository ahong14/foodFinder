const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.post('/signup', (req, res) => {
    var email = "";
    var password = "";
    if(req.body.params){
        email = req.body.params.email;
        password = req.body.params.password;
    }

    else if(req.body){
        email = req.body.email;
        password = req.body.password;
    }

    if(email === '' || email === undefined){
        return res.status(400).json({
            success: false,
            message: "Please insert email"
        })
    }

    if(password === '' || email === undefined){
        return res.status(400).json({
            success: false,
            message: "Please insert password"
        })
    }

    User.findOne(({email: email}), (err, results) => {
        if(err){
            return res.status(500).json({
                success: false,
                message: "Error with database"
            })
        }

        if(results){
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }

        else{
            //create new user
            let newUser = new User();
            let createdDate = new Date();
            newUser.email = email;
            newUser.savedItems = [];
            newUser.created_at = moment(createdDate).tz("America/Los_Angeles").format();
            newUser.updated_at = moment(createdDate).tz("America/Los_Angeles").format();
            //hash plain text to hashed password
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err){
                        console.log(err);
                        return res.status(500).json({
                            success: false,
                            message: "Error hashing password"
                        })
                    }
                    //set hashed password to object
                    newUser.password = hash;
                    //save user to db
                    newUser.save((err) => {
                        if(err){
                            console.log(err);
                            return res.status(500).json({
                                success: false,
                                message: "Error saving record"
                            })
                        }
                        return res.status(200).json({
                            success: true,
                            message: "User created!"
                        })
                    })
                })
            });
        }
    })
})

router.post('/login', (req, res) => {
    var email = "";
    var password = "";
    if(req.body.params){
        email = req.body.params.email;
        password = req.body.params.password;
    }

    else if(req.body){
        email = req.body.email;
        password = req.body.password;
    }

    if(email === '' || email === undefined){
        return res.status(400).json({
            success: false,
            message: "Please insert email"
        })
    }

    if(password === '' || email === undefined){
        return res.status(400).json({
            success: false,
            message: "Please insert password"
        })
    }
})


module.exports = router;