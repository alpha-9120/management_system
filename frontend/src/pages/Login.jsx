import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error before the request

        try {
            const response = await axios.post("http://localhost:3001/api/auth/login", {
                email,
                password,
            });

            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                navigate(response.data.user.role === "admin" ? '/admin-dashboard' : '/employee-dashboard');
            }
        } catch (error) {
            console.error("An error occurred");
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Server Error");
            }
        }
    };

    return (
        <div className="flex flex-col items-center h-screen justify-center bg-sky-200 space-y-6">
            <h2 className="font-sevillana text-3xl text-white">EMS</h2>
            <div className="border shadow p-6 w-80 bg-white">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor='email' className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor='password' className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center justify-between">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-gray-700">Remember me</span>
                        </label>
                        <a href="#" className="text-teal-600">Forgot password?</a>
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-sky-200 text-white py-2">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
