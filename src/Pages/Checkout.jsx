import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { addOrder, clearCart } from "../lib/Redux/CartSlice";
import ThankYou from "./Thanks";
import axios from "axios";

export default function Checkout() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [errors,setErrors]=useState()
  const [thanks,setThanks]=useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleConfirm = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setLoading(true);

    try {
      // Send order to n8n
      await axios.post(
        "https://hamzaerraji.app.n8n.cloud/webhook-test/order-form",
        {
          customer: formData,
          items: cartItems,
          total: total.toFixed(2),
          createdAt: new Date().toISOString(),
        },
        // {
        //   headers: { "Content-Type": "application/json" },
        // }
      );

      // Save order in Redux
      dispatch(addOrder({
        customer: formData,
        items: cartItems,
        total: total.toFixed(2),
      }));

      // Clear cart
      dispatch(clearCart());

      toast.success("Order has been confirmed 🎉");
      setThanks(true);

    } catch (error) {
      console.error("N8N Error:", error);
      toast.error("Failed to send order, please try again ❌");
    } finally {
      setLoading(false);
    }
  };


    if (thanks) return <ThankYou />;


  return (
    <>
    
    <div className="min-h-screen px-4 py-10 mt-15 bg-gray-100">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* FORM */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-[#73301c] mb-6">Checkout</h2>

          <form className="space-y-5" onSubmit={handleConfirm}>
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className={`w-full border-2 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#73301c] transition ${
                  errors?.firstName ? "border-red-500" : "border-[#73301c]"
                }`}
              />
              {errors?.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className={`w-full border-2 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#73301c] transition ${
                  errors?.lastName ? "border-red-500" : "border-[#73301c]"
                }`}
              />
              {errors?.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, City, Country"
                className={`w-full border-2 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#73301c] transition ${
                  errors?.address ? "border-red-500" : "border-[#73301c]"
                }`}
              />
              {errors?.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+212 6xx xxx xxx"
                className={`w-full border-2 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#73301c] transition ${
                  errors?.phone ? "border-red-500" : "border-[#73301c]"
                }`}
              />
              {errors?.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email"
                className={`w-full border-2 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#73301c] transition ${
                  errors?.email ? "border-red-500" : "border-[#73301c]"
                }`}
              />
              {errors?.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#73301c] text-white py-3 rounded-sm font-semibold text-lg hover:bg-[#5e2616] transition"
            >
              {loading ? "Processing..." : "Complete Order"}
            </button>
          </form>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h2 className="text-lg font-bold text-[#73301c] mb-4">Order Summary</h2>

          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-3 items-center">
                <img
                  src={item.image}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>

                <p className="font-semibold text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <hr className="my-4 text-[#73301c] border" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-[#73301c]">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}
