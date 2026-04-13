import React from "react";
import { User, Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  //Navigation
  const navigate = useNavigate();

  //States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  //Handle Change Function
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Validations
  const validate = () => {
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    const passwordRegex =
      /^(?=(?:.*\d){2,5})(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,15}$/;

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 5-15 characters, include 1 special character and 2-5 numbers";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Submission Handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log("User Saved ✅/", data);

        // redirect after signup
        navigate("/login", {
          state: { message: "Signup successful!" },
        });
      } catch (error) {
        console.error("Error:", error);
        toast.error("Signup failed!");
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-3"
      style={{
        backgroundImage: "url('../../public/Images/backgroundimg.jpg')",
        backgroundSize: "cover",
      }}
    >
      {/* Card */}
      <div className="w-full max-w-102.5 bg-white rounded-lg shadow-lg px-6 py-8">
        {/* Title */}
        <h2 className="text-center text-xl font-semibold mb-6">Sign Up</h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* UserName */}
          <div className="relative">
            <input
              type="text"
              placeholder="User Name"
              className="w-full border rounded-md py-2.5 pl-10 pr-3 outline-none focus:border-[#5F41E4]"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded-md py-2.5 pl-10 pr-3 outline-none 
    ${errors.email ? "border-red-500" : "focus:border-[#5F41E4]"}`}
              required
            />

            {/* Mail Icon */}
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>

          {/* ✅ Error OUTSIDE */}
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}

          {/* Create Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create Password"
              className="w-full border rounded-md py-2.5 pl-10 pr-10 outline-none focus:border-[#5F41E4]"
              required
            />

            {/* Lock Icon */}
            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

            {/* Eye Icon */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* ✅ Error OUTSIDE */}
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className={`w-full border rounded-md py-2.5 pl-10 pr-10 outline-none 
    ${errors.confirmPassword ? "border-red-500" : "focus:border-[#5F41E4]"}`}
              required
            />

            {/* Lock Icon */}
            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

            {/* Eye Icon */}
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* ✅ Error OUTSIDE */}
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}

          {/* Button */}
          <button className="w-full bg-[#5F41E4] text-white py-2.5 rounded-md hover:bg-[#4b34c2] transition">
            Sign Up
          </button>

          {/* Signup */}
          <p className="text-center text-sm">
            Have an account?{" "}
            <Link
              to="/login"
              className="text-[#5F41E4] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
