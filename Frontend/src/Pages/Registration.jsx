import React, { useState } from "react";
import { Link } from "react-router-dom";
import register from "../assets/assets/register.webp";
import { registerUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

function Registration() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({name , email , password}))
    console.log("registration details", { name, email, password });
    setEmail("");
    setPassword("");
    setName("");
  };
  return (
    <div>
      <div className="flex justify-between items-center gap-10 flex-col lg:flex-row">
        <div className="border p-5 rounded-lg max-w-fit shadow-2xl mx-auto m-10">
          <div className="text-center">
            <p className="font-semibold my-3">Styleo</p>
            <p className="font-bold my-3 text-xl">Hey There !👋</p>
            <p className="text-sm max-w-65 md:max-w-full mb-3">
              Enter your Name , Email and Password for Registration
            </p>
          </div>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
              <p className="font-semibold">Name:</p>
              <input
                type="name"
                name="name"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border rounded border-gray-300 p-1 focus:border-blue-700 focus:ring-1 focus:outline-none my-1 w-full"
              />
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
                Register
              </button>
              <p className="text-sm">
                Don't have an account ?{" "}
                <Link to="/login" className="text-blue-800">
                  login
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div>
          <img
            src={register}
            className="w-140 h-190 hidden lg:block object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Registration;
