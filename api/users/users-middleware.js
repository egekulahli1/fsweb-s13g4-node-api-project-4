const userModel = require('./users-model');

function validatePayload(req, res, next) {
    try {
        let { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({
                message: "username and password required"
            })
        }
        else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

function validateLogin(req,res,next){
    try {
        let existUser = userModel.findUser(req.body.username, req.body.password);
        if(!existUser){
            res.status(404).json({
                message: "invalid credentials"
            })
        }
        else{
            req.existUser = existUser;
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    validatePayload,
    validateLogin
}