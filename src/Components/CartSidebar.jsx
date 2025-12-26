import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../lib/Redux/CartSlice";

export default function CartSidebar() {
  const { items: cartItems, isOpen } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="fixed top-0 right-0 h-screen w-[22%] bg-gradient-to-b from-white to-gray-100 shadow-2xl flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-bold text-[#73301c]">Events Cart</h1>
          <IoCloseSharp
            size={28}
            className="cursor-pointer"
            onClick={() => dispatch(toggleCart(false))}
          />
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              Your cart is empty
            </p>
          ) : (
            cartItems.map(item => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-white rounded-xl shadow"
              >
                <img
                  src={item.image}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                  <p className="font-medium">${item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t bg-white">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <button className="w-full mt-4 bg-[#73301c] text-white py-3 rounded-xl hover:bg-[#5e2616]">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
