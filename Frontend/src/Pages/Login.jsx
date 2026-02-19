import React, { useState } from "react";
import { Link } from "react-router-dom";
import login from "../assets/assets/login.webp";
import { loginUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({email ,password}))
    //console.log("login details", { email, password });
    setEmail("");
    setPassword("");
  };
  return (
    <div className="flex justify-between items-center gap-10 flex-col lg:flex-row">
      <div className="border p-5 rounded-lg max-w-fit shadow-2xl mx-auto m-10">
        <div className="text-center">
          <p className="font-semibold my-3">Styleo</p>
          <p className="font-bold my-3 text-xl">Hey There !👋</p>
          <p className="text-sm mb-3">
            Enter your Email and Password for login
          </p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <p className="font-semibold">Email:</p>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded border-gray-300 p-1 focus:border-blue-700 focus:ring-1 focus:outline-none my-1 w-full"
            />
            <p className="font-semibold">Password:</p>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border rounded p-1 border-gray-300 focus:border-blue-700 focus:ring-1 focus:outline-none my-1 w-full"
            />
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="p-2 px-5 bg-black text-white font-semibold rounded-md w-full"
            >
              Login
            </button>
            <p className="text-sm">
              Don't have an account ?{" "}
              <Link to="/registration" className="text-blue-800">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div>
        <img src={login} className="w-150 h-200 hidden lg:block" />
      </div>
    </div>
  );
}

export default Login;
