import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import signupPattern from '../assets/pattern.png'; 
import { useState } from 'react';
import API from '../api/index'

const SignupPage = () => {
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        city: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();  

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(formData.password !== formData.confirmPassword){
            console.error('"Passwords do not match')
            return
        }

        try{
            const {confirmPassword, ...dataToSend} = formData
            const response = await API.post('/auth/signup', dataToSend)
            console.log('API Response Data:', response.data);


            const { token, user } = response.data.data;
            login(token, user);
            navigate('/');

            console.log('Signup Successful: ', response.data)

        }catch(error){
            console.error('SignUp failed: ', error.response.data)
        }

    }

    return (
        <div className="flex w-full min-h-screen">
        {/* Pattern Section */}
        <div
            className="hidden md:flex w-1/2 bg-cover bg-center"
            style={{ backgroundImage: `url(${signupPattern})` }}
        ></div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-[#333333] mb-2">Create an account</h2>
            <p className="text-gray-600 mb-8">
                Already have an account?{' '}
                <Link to="/login" className="text-black font-semibold hover:underline">
                Log in
                </Link>
            </p>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <label className="block text-[#666666] text-sm font-regular mb-2" htmlFor="name">
                    Full name
                </label>
                <input
                    className="w-full px-3 py-2 border border-[#666666] border-opacity-10 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                />
                </div>

                <div className="mb-4">
                <label className="block text-[#666666] text-sm font-regular mb-2" htmlFor="email">
                    Email address
                </label>
                <input
                    className="w-full px-3 py-2 border border-[#666666] border-opacity-10 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                />
                </div>

                <div className="mb-4">
                <label className="block text-[#666666] text-sm font-regular mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="w-full px-3 py-2 border border-[#666666] border-opacity-10 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                />
                <label className="block text-[#666666] text-sm font-regular mb-2">
                    Use 8 or more characters with a mix of letters, numbers & symbols
                </label>
                </div>

                <div className="mb-4">
                <label className="block text-[hsl(0,0%,40%)] text-sm font-regular mb-2" htmlFor="confirm-password">
                    Confirm Password
                </label>
                <input
                    className="w-full px-3 py-2 border border-[#666666] border-opacity-10 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                </div>

                <div className="mb-6">
                <label className="block text-[#666666] text-sm font-regular mb-2" htmlFor="city">
                    City
                </label>
                <input
                    className="w-full px-3 py-2 border border-[#666666] border-opacity-10 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    id="city"
                    type="text"
                    placeholder="Your city"
                    value={formData.city}
                    onChange={handleChange}
                />
                </div>

                <p className="text-sm text-gray-500 mt-6 mb-4 w-60">
                By creating an account, you agree to our{' '}
                <a href="#" className="underline text-black">Terms of Use</a> and{' '}
                <a href="#" className="underline text-black">Privacy Policy</a>.
                </p>

                <div>
                <button
                    type="submit"
                    className="w-55 h-12 bg-gray-400 text-white font-regular mt-2 py-2 px-4 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
                >
                    Create an account
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
};

export default SignupPage;