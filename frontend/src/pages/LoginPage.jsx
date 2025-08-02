import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import signupPattern from '../assets/pattern.png'; 
import { useState } from 'react';
import API from '../api/index'

const LoginPage = () => {
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    
    const [error, setError] = useState('')

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();  

    const handleChange = (e) => {
        if (error) {
          setError('');
        }

        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }


    const handleSubmit = async(e) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
          setError('Please fill in all fields.');
          return; 
        }

        try{
            const response = await API.post('/auth/login', formData)
            console.log('API Response Data:', response.data);


            const { token, user } = response.data.data;
            login(token, user);
            navigate('/');

            console.log('Login Successful: ', response.data)

        }catch(error){
            setError(error.response?.data?.message || 'An unexpected error occurred.')
            console.error('Login failed: ', error.response.data)
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
            <h2 className="text-3xl font-bold text-[#333333] mb-2">Welcome Back</h2>
            <p className="text-gray-600 mb-8">
                Don't have an account?{' '}
                <Link to="/signup" className="text-black font-semibold hover:underline">
                Sign up
                </Link>
            </p>

            <form onSubmit={handleSubmit}>
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
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-left mb-4">{error}</p>
                )}

                <div>
                <button
                    type="submit"
                    className="w-55 h-12 bg-gray-400 text-white font-regular mt-2 py-2 px-4 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
                >
                    Sign in
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
};

export default LoginPage;