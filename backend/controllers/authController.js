const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const UserRepository = require("../repositories/userRepository");
const AuthService = require("../services/authService");

const { errorResponse } = require("../utils/errorResponse");

const authService = new AuthService(new UserRepository())

const signup = async(req, res) => {
    try{
        const { token, user } = await authService.signup(req.body)
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Successfully signed up',
            data: { 
                token: token,
                user: {id: user._id, name: user.name, email: user.email, city: user.city} },
            error: {},
        })
    }catch(err){
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorResponse(err.message, err));
    }
}

const login = async(req, res) => {
    try{
        const {token, user} = await authService.login(req.body)
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully logged in',
            data: { 
                token: token,
                user: {id: user._id, name: user.name, email: user.email} 
            },
            error: {},
        })
    }catch(err){
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json(errorResponse(err.message, err));
    }
}

module.exports = {
    signup,
    login
}