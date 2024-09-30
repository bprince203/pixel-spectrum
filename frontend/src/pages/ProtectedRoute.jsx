import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000";

const LoginForm = ({ setLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api_url}/api/auth/user/login/`, formData, { withCredentials: true });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Login failed');
      }

      setLogin(true); // Update authentication state in the parent component
    } catch (error) {
      console.error('Error during login:', error.message);
      setError(error.message || 'Network response was not ok');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="form-area w-2/6 p-4 bg-white border rounded-md">
        <h2 className='font-bold text-2xl text-center'>Admin Login</h2>
        <form className='flex-col flex p-4 gap-4' onSubmit={handleFormSubmit}>
          <input type="text" name="email" onChange={handleOnChange} placeholder='Enter Your Email' className='outline-none p-2 bg-[#efefef]' />
          <input type="password" name='password' onChange={handleOnChange} placeholder='Enter Your Password' className='outline-none p-2 bg-[#efefef]' />
          <button className='bg-black p-2 text-white hover:bg-[#111111e3] transition-all'>Submit</button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

function Dashboard() {
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.background = '#efefef';
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Check if the user is authenticated by making a request to a protected endpoint
        const response = await axios.get(`${api_url}/api/auth/user/validate`, { withCredentials: true });
        console.log(response.data)
        if (response.data.success) {
          setLogin(true);
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setLogin(false)
        navigate('/dashboard');
      }
    };

    checkLoginStatus();
  }, [navigate]);

  return isLogin ? <Outlet /> : <LoginForm setLogin={setLogin} />;
}

export default Dashboard;
