import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();

  // Clear cart when arriving on this page


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 text-center max-w-md">
        <h1 className="text-4xl font-bold text-[#73301c] mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your order has been successfully placed. We appreciate your business!
        </p>
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-[#73301c] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#5e2616] transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
