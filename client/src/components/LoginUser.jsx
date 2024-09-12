/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../Loaders/Loader";
import "../index.css";

const LoginUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
    if (apiError) {
      setApiError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/login",
          formData
        );
        console.log("Login successful:", response.data);
        setIsSubmitted(true);
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } catch (error) {
        console.error("Error logging in:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setApiError("Username or password is incorrect");
        } else {
          setApiError("An error occurred. Please try again.");
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4 sm:px-6 lg:px-8 relative">
      {isSubmitted && <Loader />} {/* Show Loader when isSubmitted is true */}
      {!isSubmitted && (
        <div className="max-w-md w-full bg-zinc-800 p-8 rounded-xl shadow-lg">
          <div className="mb-6">
            <h2 className="text-center text-3xl font-extrabold text-white">
              Login to Your Account
            </h2>
            <p className="text-center text-sm mt-1 text-zinc-400">
              Welcome back!
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Username Field */}
              <div className="relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className={`block w-full px-10 py-2 border rounded-md text-white bg-zinc-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.username ? "border-red-500" : "border-gray-600"
                    }`}
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                {errors.username && (
                  <p className="mt-2 text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className={`block w-full px-10 py-2 border rounded-md text-white bg-zinc-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.password ? "border-red-500" : "border-gray-600"
                    }`}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-300 focus:outline-none"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            {/* API Error Message */}
            {apiError && (
              <div className="text-center text-sm text-red-500 mb-4">
                {apiError}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              >
                Login
              </button>
              <p className="w-full text-zinc-400 text-sm mt-3">
                Don't have an Account?{" "}
                <a href="/" className="text-white">
                  Create One
                </a>
              </p>
            </div>
          </form>
        </div>
      )}
      {isSubmitted && (
        <div className="absolute inset-0 flex justify-center bg-zinc-900 bg-opacity-0 z-50 top-20">
          <div className="text-center text-white">
            <h2 className="text-3xl font-extrabold mb-4">Login Successful!</h2>
            <p className="text-sm text-gray-400">
              Redirecting to your profile...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginUser;
