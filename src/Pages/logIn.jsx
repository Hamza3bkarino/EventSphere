import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdmin } from "../lib/Redux/AdminSlice";

export default function LogIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://694d4e33ad0f8c8e6e20583d.mockapi.io/event/user`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) return;

    if (!data.length) {
      toast.error("Users not loaded yet");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (
        form.email === data[0].email &&
        form.password === data[0].password
      ) {
        dispatch(setAdmin(true));
        toast.success("Login Successfully ✅");
        navigate("/admin/Dashboard");
      } else {
        toast.error("Login error ❌");
      }
      setLoading(false);
    }, 1200); // fake delay for UX
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        
        <h2 className="text-2xl font-bold text-center text-[#73301c] mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full border-2 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#73301c]
                ${errors.email ? "border-red-500" : "border-[#73301c]"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full border-2 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#73301c]
                ${errors.password ? "border-red-500" : "border-[#73301c]"}`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#73301c] text-white py-3 rounded-sm font-semibold text-lg
              hover:bg-[#5e2616] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span className="text-[#73301c] font-semibold cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
