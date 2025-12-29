import { useEffect, useState } from "react";
import { MdDashboard, MdEvent, MdEventAvailable } from "react-icons/md";
import { FiLogOut, FiChevronUp, FiChevronDown } from "react-icons/fi";
import AddEvent from "./AddEvent";
import AdminEvents from "./AdminEvents";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../../lib/Redux/AdminSlice";



export default function Dashboard() {
  const [logOutButton, setLogOutButton] = useState(false);
  const [AddForm, setAddForm] = useState(false);
  const [orders, setOrders] = useState(false);
  const [AppearEvents, setAppearEvents] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [tapActive, setTapActive] = useState('events');
  const ordersCart = useSelector((state)=>state.cart.orders);
  console.log(ordersCart);
  
  const dispatch = useDispatch();

  useEffect(() => {
     dispatch(setAdmin(true));
 
     return () => {
       dispatch(setAdmin(false)); // when leaving page
     };
   }, [dispatch]);

  

  return (
    <div className="flex">
            <aside
                className={`
                    fixed top-0 left-0 h-screen bg-white text-[#73301c]
                    flex flex-col justify-between p-6 shadow-xl
                    transition-all duration-300 z-40
                    ${collapsed ? "w-26" : "w-64"}
                `}
            >


            {/* Top Section */}
            <div>
                <h2 className="text-2xl font-extrabold mb-10 tracking-wide flex items-center gap-2">
                <MdDashboard size={30} />
                Dashboard
                </h2>

                <nav className={`space-y-3 flex flex-col ${collapsed ? "items-center" : ""}`}>
                    <button
                        className={`w-full flex items-center py-3 rounded-xl font-medium transition-all duration-300
                        ${collapsed ? "justify-center px-0" : "gap-3 px-4 hover:bg-[#73301c] hover:text-white"}
                        ${tapActive === 'commands' ? "bg-[#73301c] text-white"  : ""}
                        `}


                        onClick={()=> {
                            setCollapsed((prev)=>!prev);
                            setTapActive('commands');
                            setAppearEvents(false);
                            setAddForm(false);
                            setOrders(true);
                        }}
                    >
                        <MdDashboard size={30} />
                        {!collapsed && "Commands"}

                    </button>

                    <button
                        className={`w-full flex items-center py-3 rounded-xl font-medium transition-all duration-300
                        ${collapsed ? "justify-center px-0" : "gap-3 px-4 hover:bg-[#73301c] hover:text-white"}
                        ${tapActive === 'Add' ? "bg-[#73301c] text-white"  : ""}
                        `}


                        onClick={()=> {
                            setAddForm(true);
                            setAppearEvents(false);
                            setCollapsed((prev)=>!prev);  
                            setTapActive('Add')  
                        }
                        }
                    >
                        <MdEvent size={30} />
                        {!collapsed && "New Event"}
                    </button>

                    <button
                        className={`w-full flex items-center py-3 rounded-xl font-medium transition-all duration-300 
                        ${collapsed ? "justify-center px-0 "  : "gap-3 px-4 hover:bg-[#73301c] hover:text-white"}
                        ${tapActive === 'events' ? "bg-[#73301c] text-white"  : ""}
                        `}


                        onClick={()=> {
                            setAppearEvents(true);
                            setAddForm(false);
                            setCollapsed((prev)=>!prev);
                            setTapActive('events')
                        }}
                    >
                        <MdEventAvailable size={30} />
                        {!collapsed && "Manage Events"}
                    </button>
                </nav>
            </div>

            {/* Bottom Profile */}
            <div className="relative">
                <div
                className="flex items-center justify-between gap-4 border-t border-[#73301c]/20 pt-5 cursor-pointer"
                onClick={() => {
                    if (!collapsed) setLogOutButton(prev => !prev);
                }}
                >
                <div className={`flex items-center ${collapsed ? "justify-center w-full" : "gap-4"}`}>
                    <img
                    src="https://i.pravatar.cc/45"
                    alt="Profile"
                    className="w-11 h-11 rounded-full border-2 border-[#73301c]"
                    />
                    <div>
                    <p className={`text-sm font-bold ${collapsed ? 'hidden':''}`}>Hamza</p>
                    <p className={`text-xs text-[#73301c]/70 ${collapsed ? 'hidden':''}`}>Admin</p>
                    </div>
                </div>

                {!collapsed && (logOutButton ? <FiChevronDown /> : <FiChevronUp />)}
                </div>

                {/* Logout Button */}
                <div
                className={`absolute bottom-16 left-0 w-full px-4 transition-all duration-300 ease-in-out
                ${logOutButton && !collapsed ? "opacity-100 -translate-y-2" : "opacity-0 translate-y-4 pointer-events-none"}`}
                >
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    bg-[#73301c] text-white hover:bg-[#5e2616] transition">
                    <FiLogOut size={18} />
                    Logout
                </button>
                </div>
            </div>

            </aside>

            <div
                className={`
                    ${collapsed ? "ml-26" : "ml-64"}
                    flex-1 h-screen overflow-y-auto transition-all duration-300
                `}
                >

                {
                    AddForm &&(
                            <div className=" flex items-center justify-center w-full h-screen">
                                <AddEvent/>
                            </div>
                    )
                }
                {
                    AppearEvents &&(
                            <div className="w-full">
                                <AdminEvents/>
                            </div>
                    )
                }

                {orders && ordersCart.length>0 && (
                    <div className="space-y-6">
                        {ordersCart.map(order => (
                        <div
                            key={order.id}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            {/* ORDER HEADER */}
                            <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="font-bold text-lg text-[#73301c]">
                                Order #{order.id}
                                </h2>
                                <p className="text-sm text-gray-500">
                                {order.customer.firstName} {order.customer.lastName} • {order.customer.phone}
                                </p>
                                <p className="text-sm text-gray-500">
                                {order.customer.address}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-sm text-gray-500">Total</p>
                                <p className="text-xl font-bold text-[#73301c]">
                                ${order.total}
                                </p>
                            </div>
                            </div>

                            {/* ITEMS TABLE */}
                            <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">Product</th>
                                    <th className="px-4 py-2">Image</th>
                                    <th className="px-4 py-2 text-center">Qty</th>
                                    <th className="px-4 py-2 text-right">Price</th>
                                    <th className="px-4 py-2 text-right">Total</th>
                                </tr>
                                </thead>

                                <tbody className="divide-y">
                                {order.items.map(item => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 font-medium">
                                        {item.title}
                                    </td>

                                    <td className="px-4 py-2">
                                        <img
                                        src={item.image}
                                        className="w-12 h-12 rounded object-cover mx-auto"
                                        />
                                    </td>

                                    <td className="px-4 py-2 text-center">
                                        {item.quantity}
                                    </td>

                                    <td className="px-4 py-2 text-right">
                                        ${item.price}
                                    </td>

                                    <td className="px-4 py-2 text-right font-semibold">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}


            </div>
    </div>
  );
}
