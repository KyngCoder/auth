import React, { useEffect } from "react";
import {useNavigate } from "react-router";

const HomePage = () => {
  const [token, setToken] = React.useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) setToken(true)
  }, [navigate]);

  const signOut = () => {
    localStorage.removeItem("userInfo");
    setToken(false);
  }

 
  return (
    <div className="flex justify-center items-center
    h-screen">
      {token ? (
        <div>
          <h1>Welcome to the Home Page</h1>
          <button className = "mx-4 bg-blue-500 text-white p-2 rounded-sm hover:bg-red-500" onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <div className="flex bg-blue-400 shadow-inner p-4 rounded-sm border-blue-400">
          <button className="mx-4 bg-blue-500 text-white p-2 rounded-sm hover:bg-green-600" onClick={()=>navigate('/login')}>Login</button>
          <button className="mx-4 bg-blue-500 text-white p-2 rounded-sm hover:bg-red-500" onClick={()=> navigate('/signup')}>SignUp</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
