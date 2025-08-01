const User = require("../models/userModel");

class UserRepository{
    createUser = async(userData) => {
        try{
            const newUser = await User.create(userData)
            return newUser

        }catch(err){
            console.log(err)
            throw err
        }
    }

    findUserByEmail = async(email) => {
        try{
            const user = await User.findOne({email: email})
            return user
        }catch(err){
            console.log(err);
            throw err;
            
        }
    }
}

module.exports = UserRepository