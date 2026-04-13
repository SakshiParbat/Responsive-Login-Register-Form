import React from "react";
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  //Toaster
  const location = useLocation();
  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message, {
        duration: 3000,
      });

      // clear state AFTER toast shows
      setTimeout(() => {
        window.history.replaceState({}, document.title);
      }, 3000);
    }
  }, [location.state]);

  //Navigation
  const navigate = useNavigate();

  //States
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  //Handle Change function
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //Validations
  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Submission Handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({}); // clear old errors

    if (!validate()) return;

    try {
      const response = await fetch(
        `http://localhost:3001/users?email=${formData.email}`,
      );

      const users = await response.json();

      //  user not found
      if (users.length === 0) {
        setErrors({ general: "Invalid email or password" });
        return;
      }

      const user = users[0];

      //  password mismatch
      if (user.password !== formData.password) {
        setErrors({ general: "Invalid email or password" });
        return;
      }

      // after login success
      toast.success("Login successful!");

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      setErrors({ general: "Server error. Please try again." });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-3"
      style={{
        backgroundImage: "url('/Images/backgroundimg.jpg')",
        backgroundSize: "cover",
      }}
    >
      {/* Card */}
      <div className="w-full max-w-102.5 bg-white rounded-lg shadow-lg px-6 py-8">
        {/* Title */}
        <h2 className="text-center text-xl font-semibold mb-6">Log in with</h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full border rounded-md py-2.5 pl-10 pr-3 outline-none focus:border-[#5F41E4]"
              required
            />

            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border rounded-md py-2.5 pl-10 pr-3 outline-none focus:border-[#5F41E4]"
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

          {/* General Error (ye already correct hai) */}
          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}

          {/* Forgot */}
          <div className="text-right text-sm">
            <Link
              to="/forgot"
              className="text-[#5F41E4] font-medium hover:underline"
            >
              <Route path="/forgot" element={<h1>Forgot Password</h1>} />
            </Link>
          </div>

          {/* Button */}
          <button className="w-full bg-[#5F41E4] text-white py-2.5 rounded-md hover:bg-[#4b34c2] transition">
            Log In
          </button>

          {/* Signup */}
          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/" className="text-[#5F41E4] font-medium hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
