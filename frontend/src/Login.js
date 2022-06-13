import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !password) {
      alert("Please fill out all fields");
      return;
    }
   
    console.log(name, password);
    try {
      const { data } = await axios.post("http://localhost:5000/user/login", {
        name,
        password,
      });
      console.log(data);
      alert("Successfully Logged In!");
      localStorage.setItem("userInfo", JSON.stringify(data));
 
      navigate('/')
    } catch (error) {
      console.log(error);
      alert("Error logging in");
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 ">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Username
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="***********"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
           
          </div>
          </div>
        
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type={show ? "text" : "password"}
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className = "flex justify-between">
           <p className="text-gray-600 text-xs italic">
             Please enter your password.
            </p>
            <button className="hover:text-green-500" type="button" onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
            </button>
           </div>
          </div>
        </div>
    
      
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 bg-blue-500 rounded-sm flex justify-center">
            <button className="p-2 flex text-white" onClick={handleSubmit}>Login</button>
            </div>
      </form>
    </div>
  );
};

export default Login;
