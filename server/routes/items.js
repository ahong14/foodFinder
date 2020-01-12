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

    //search based on current logged in user
    User.find({email: currentUser}, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error with database"
            })
        }

        //result returned as array with one entry, extract single entry
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
    
    //search based on current logged in user
    //findOne returns one object entry
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
        
        //find record with matching email and update results
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
    var removeItemName;
    var currentUser;

    if(req.query.params){
        removeItemName = req.query.params.removeItemName;
        currentUser = req.query.params.currentUser;
    }

    else if(req.query){
        removeItemName = req.query.removeItemName;
        currentUser = req.query.currentUser;
    }

    if(removeItemName === undefined || currentUser === undefined){
        return res.status(400).json({
            success: false,
            message: "Invalid item or user"
        })
    }

    //search based on current logged in user
    User.find({email: currentUser}, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error with database"
            })
        }

        //results returned as array, extract first item
        let updateSavedItems = result[0];
        //spread saved items
        updateSavedItems = [...updateSavedItems.savedItems];
        //create filtered version of savedItems, removing target deleted item
        updateSavedItems = updateSavedItems.filter(item => {
            return item.businessName !== removeItemName;
        });

        //update database collection of removed item
        User.findOneAndUpdate({email: currentUser}, {
            savedItems: [...updateSavedItems]
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
                message: "Item removed from saved collection.",
                items: updateSavedItems
            })
        })
    })
})

module.exports = router;