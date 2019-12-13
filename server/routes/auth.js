const express = require('express');
const router = express.Router();

router.get('/signup', (req, res) => {
    
})

router.post('/login', (req, res) => {
    var email = "";
    var password = "";
    if(req.body.params){
        email = req.body.params.email;
        password = req.body.params.password;
        return res.status(200).json({
            success: true,
            values: req.body.params
        })
    }

    else if(req.body){

    }
})


module.exports = router;