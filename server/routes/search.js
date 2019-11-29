const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res) => {
    //documentation: https://www.yelp.com/developers/documentation/v3/business_search
    const yelpURL = "https://api.yelp.com/v3/businesses/search";
    //extract query params
    let queryParams = {...req.query};
    let requestOptions = {
        uri: yelpURL,
        qs: queryParams,
        headers: {   
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + process.env.YELP_API_KEY
        }
    };

    //make external request to yelp api
    request.get(requestOptions, (err, resp, body) => {
        if(err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error with API request"
            })
        }

        return res.status(200).json({
            success: true,
            body: body
        })
    });
})

module.exports = router;