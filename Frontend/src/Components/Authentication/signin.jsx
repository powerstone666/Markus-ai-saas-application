import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useState} from 'react';
import {useContext} from 'react';
import { Context } from "../../main";
function Signin() {
  const {setToken,url}=useContext(Context);
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/v1/login`, user);
      if (res.data && res.data.accessToken) {
        setToken(res.data.accessToken);
        localStorage.setItem('token', res.data.accessToken);
        window.location.reload()
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.error(err);
    }
  }
  return (
    <>
      <div className="bg-[#111827] min-h-screen flex flex-col">
        <nav className="p-4 bg-transparent flex items-center justify-between">
          <div>
            <h1 className="text-white text-lg sm:text-2xl">Markus AI</h1>
          </div>
        <Link to="/"> <div>
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
           Welcome Back
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  className="space-y-6" onSubmit={(e) => { handleSubmit(e) }}>
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
                  onChange={(e) => handleChange(e)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={(e) => handleChange(e)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <Link to="/register">
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Register Here
            </a>
          </p>
          </Link>
        </div>
      </div>s
      </div>
    </>
  );
}

export default Signin;
