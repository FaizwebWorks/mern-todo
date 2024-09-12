import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../Loaders/Loader"; // Assuming the loader is in the same folder structure as in LoginUser
import "../index.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
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
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true); // Show loader when form is submitted
      try {
        const response = await axios.post("http://localhost:3000/api/register", formData);
        console.log("Form submitted:", response.data);
        setTimeout(() => {
          navigate('/login'); // Redirect to login after 2 seconds
          setIsSubmitted(false)
        }, 2000);
      } catch (error) {
        console.error("Error registering:", error);
        // Handle errors here, e.g., set an error state
        setIsSubmitted(false); // Hide loader if there's an error
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4 sm:px-6 lg:px-8 relative">
      {isSubmitted && <Loader />} {/* Show loader when isSubmitted is true */}
      {!isSubmitted && (
        <div className="max-w-md w-full bg-zinc-800 p-8 rounded-xl shadow-lg">
          <div className="mb-6">
            <h2 className="text-center text-3xl font-extrabold text-white">
              Create Your Account
            </h2>
            <p className="text-center text-sm mt-1 text-zinc-400">
              Welcome to TODO! Just Do It.
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

              {/* Email Field */}
              <div className="relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`block w-full px-10 py-2 border rounded-md text-white bg-zinc-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-600"
                    }`}
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">{errors.email}</p>
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

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              >
                Create Account
              </button>
              <p className="w-full text-zinc-400 text-sm mt-3">
                Already have an Account?{" "}
                <a href="/login" className="text-white">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      )}
      {isSubmitted && (
        <div className="absolute inset-0 flex justify-center bg-zinc-900 bg-opacity-0 z-50 top-20">
          <div className="text-center text-white">
            <h2 className="text-3xl font-extrabold mb-4">Registration Successful!</h2>
            <p className="text-sm text-gray-400">Redirecting to Login Page...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
