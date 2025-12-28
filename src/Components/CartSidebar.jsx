import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart, incrementQty, decrementQty , removeFromCart } from "../lib/Redux/CartSlice";
import { PiTrashSimpleDuotone } from "react-icons/pi";

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
      <div className="fixed top-0 right-0 h-screen w-[30%] bg-linear-to-b from-white to-gray-100 shadow-2xl flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center p-6 " style={{ borderBottom: 'solid 2px #dddddd'}}>
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
                className="flex gap-4 p-3 bg-white rounded-xl shadow relative"
              >
                <img
                  src={item.image}
                  className="w-28 h-36 rounded-lg object-cover"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>

                  <p className="font-medium mt-2 text-[#73301c]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    {/* Decrement button */}
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 
                                hover:bg-gray-100 transition text-lg font-semibold"
                      onClick={() => dispatch(decrementQty(item.id))}
                    >
                      −
                    </button>

                    {/* Quantity display */}
                    <span className="font-medium w-6 text-center">{item.quantity}</span>

                    {/* Increment button */}
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 
                                hover:bg-gray-100 transition text-lg font-semibold"
                      onClick={() => dispatch(incrementQty(item.id))}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Trash icon */}
                <PiTrashSimpleDuotone
                  size={24}
                  className="absolute top-[50%] right-3 cursor-pointer text-red-500 hover:text-red-600 transition"
                  onClick={() => dispatch(removeFromCart(item.id))}
                />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white" style={{ borderTop: 'solid 2px #dddddd'}}>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
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
