import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is not valid";
    }

    if (!form.message.trim())
      newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!validate()) return;
    try {
         await axios.post(
            "https://hamzaerraji.app.n8n.cloud/webhook-test/contact-form",
            form,
            {
                headers: {
                "Content-Type": "application/json",
                },
            }
        );
    
          toast.success('Your message has been sent successfully')
          setForm({
            firstName: "",
            lastName: "",
            email: "",
            message: "",
          });
        
    } catch (error) {
    console.error(error);
    alert("Error sending message");
  } finally {
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 mt-14">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-[#73301c] mb-6">
          Contact Us
        </h2>

        {/* {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm">
            Your message has been sent successfully ✅
          </div>
        )} */}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#73301c]
                  ${errors.firstName ? "border-red-500" : "border-[#73301c]"}`

              }
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#73301c]
                  ${errors.lastName ? "border-red-500" : "border-[#73301c]"}`

              }            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#73301c]
                  ${errors.email ? "border-red-500" : "border-[#73301c]"}`

              }            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              placeholder="Your message..."
              rows="4"
              value={form.message}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#73301c]
                  ${errors.message ? "border-red-500" : "border-[#73301c]"}`

              }            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#73301c] text-white py-3 rounded-sm font-semibold hover:bg-[#5e2616] transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
