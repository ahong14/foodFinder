const jwt = require('jsonwebtoken');

//auth middleware, check jwt tokens
const authMiddleware = (req, res, next) => {
    if(req.cookies.authToken === undefined){
        return res.status(400).json({
            success: false,
            message: "No ID Token found"
        })
    }

    let authToken = req.cookies.authToken;
    jwt.verify(authToken, process.env.JWT_SECRET, (err, payload) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error with token"
            })
        }

        console.log("payload: ", payload);
        next();
    })
} 

module.exports = authMiddleware;