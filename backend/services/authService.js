const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

class AuthService{
    constructor(userRepository){
        this.userRepository = userRepository
    }

    signup = async(userData) => {
        const {name, email, password} = userData;
        
        const existingUser = await this.userRepository.findUserByEmail(email)
        if(existingUser){
            throw new Error('User already registered')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await this.userRepository.createUser({
            name, 
            email,
            password: hashedPassword
        })

        return newUser
    }

    login = async(userData) => {
        const{email, password} = userData

        const user = await this.userRepository.findUserByEmail(email)
        if(!user){
            throw new Error('Invalid email or password')
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            throw new Error('Invalid email or password')
        }

        const payload = {id: user._id, name: user.name}
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        return {token, user}
    }
}

module.exports = AuthService