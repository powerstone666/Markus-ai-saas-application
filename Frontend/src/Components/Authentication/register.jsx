import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useState} from 'react';
function Register() {
const [user,setUser]=useState({username:"",email:"",password:""});
const handleChange=(e)=>{
  setUser({...user,[e.target.name]:e.target.value});
}
const handleSubmit=async (e)=>{
  e.preventDefault();
  try{
    const url="https://markus-ai-saas-application.vercel.app"
      //const url="http://localhost:3000"
   const res= await axios.post(`${url}/api/v1/register`,user)

  }
  catch(err){
    console.log(err);
  
  }
}
  return (
    <>
      <div className="bg-[#111827] min-h-screen flex flex-col">
        <nav className="p-4 bg-transparent flex items-center justify-between">
          <div>
            <h1 className="text-white text-lg sm:text-2xl">Markus AI</h1>
          </div>
      <Link to="/">  <div>
            <Button
              variant="text"
              className="w-full lg:w-auto"
              sx={{ backgroundColor: "white", color: "black" }}
            >
              Get Started
            </Button>
          </div>
          </Link>
        </nav>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
           Register to get started
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  className="space-y-6" onClick={(e)=>{handleSubmit(e)}}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  value={user.username}
                  type="text"
                  required
                  autoComplete="text"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-white">
               Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  required
                  autoComplete="email"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                  Password
                </label>
             
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               Register
              </button>
            </div>
          </form>
           <Link to="/login">
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already a member?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
             Sign-In
            </a>
          </p>
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}

export default Register;
