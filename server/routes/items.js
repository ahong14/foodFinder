const express = require('express');
const router = express.Router();
const User = require('../models/Users');

//get Itemsfor current user
router.get('/', (req, res) => {
    var currentUser;

    if(req.query.params){
        currentUser = req.query.params.currentUser;
    }

    else if(req.query){
        currentUser = req.query.currentUser;
    }

    User.find({email: currentUser}, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error with database"
            })
        }

        let returnResult = result[0];

        return res.status(200).json({
            success: true,
            items: returnResult.savedItems
        })
    })
})

//add item and update user collection
router.post('/add', (req, res) => {
    var addItem;
    var currentUser;

    if(req.body.params){
        currentUser = req.body.params.currentUser;
        addItem = req.body.params.addItem;
    }

    else if(req.body){
        currentUser = req.body.currentUser;
        addItem = req.body.addItem;
    }
    console.log("current user: ", currentUser);
    User.findOne({email: currentUser}, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({   
                success: false,
                message: "Error with database"
            })
        }

        let updatedItems= [...result.savedItems];
        //TODO check for duplicates
        updatedItems.push(addItem);
        
        User.findOneAndUpdate({email: currentUser}, {
            savedItems: [...updatedItems]
        }, (err, updatedResult) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Error with database"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Added item to collecion"
            });
        })
    })
})

//remove item from collection
router.delete('/remove', (req, res) => {

})

module.exports = router;