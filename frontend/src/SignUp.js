import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !password || !confirmPassword) {
      alert("Please fill out all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(name,password);
    try {
      const { data } = await axios.post("http://localhost:5000/user/signup", {
        name,
        password,
      });
           localStorage.setItem("userInfo", JSON.stringify(data));
      alert("Successfully signed up!");

      navigate('/')
    } catch (error) {
      console.log(error);
      alert("Error signing up");
    }
  };

  

  return (
    <div className="flex justify-center items-center
    h-screen">
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 ">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Username
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Ricky"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          </div>
          </div>
        
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
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
              Make it as long and as crazy as you'd like
            </p>
            <button className="hover:text-green-500" type="button" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </button>
           </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-confirmPassword"
              type={show ? "text" : "password"}
              placeholder="******************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className="text-gray-600 text-xs italic">
              Repeat password
            </p>
          </div>
        </div>
      
        <div className="w-full px-3 mb-6 md:mb-0  rounded-sm ">
            <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>Sign Up</button>
            </div>
      </form>
    </div>
  );
};

export default SignUp;
