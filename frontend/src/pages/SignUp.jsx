import React, { useState, useContext } from "react";
import bg from "../assets/authBg.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext";

function SignUp() {
  const { serverUrl, setUserData } = useContext(userDataContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log({ name, email, password });

    setErr("");
    setLoading(true);

    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );
      setUserData(result.data);
      console.log(result);
      setLoading(false);
      navigate("/customize");
    } catch (error) {
      console.log("Frontend Error:", error.response?.data || error.message);
      setUserData(null);
      setLoading(false);
      setErr(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="w-full h-[100vh] bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-[70%] max-w-[500px] h-[500px] bg-[#00000008] backdrop-blur rounded-xl p-6 shadow-lg shadow-black"
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-2xl font-bold mb-6 text-center">
          Register To <span className="text-black">Virtual Assistant</span>
        </h1>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full h-[50px] outline-none border-2 border-white mb-5 bg-transparent text-white text-sm placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full h-[50px] outline-none border-2 border-white mb-5 bg-transparent text-white text-sm placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="w-full h-[50px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative mb-5">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {showPassword ? (
            <IoEyeOff
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white w-6 h-6"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEye
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white w-6 h-6"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {err.length > 0 && (
          <p className="text-red-500 text-[17px] mb-4">*{err}</p>
        )}

        <div className="w-full flex justify-center mt-5">
          <button
            type="submit"
            className="bg-blue-800 text-white text-[20px] py-3 px-7 rounded-full font-bold hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </div>

        <div className="w-full flex justify-center mt-8">
          <p
            className="text-white text-[17px] cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Already have an account?{" "}
            <span className="text-black font-bold">Sign In</span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
