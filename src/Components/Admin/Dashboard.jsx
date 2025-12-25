import { useEffect, useState } from "react";
import { MdDashboard, MdEvent, MdEventAvailable } from "react-icons/md";
import { FiLogOut, FiChevronUp, FiChevronDown } from "react-icons/fi";
import AddEvent from "./AddEvent";
import AdminEvents from "./AdminEvents";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../lib/Redux/AdminSlice";



export default function Dashboard() {
  const [logOutButton, setLogOutButton] = useState(false);
  const [AddForm, setAddForm] = useState(false);
  const [AppearEvents, setAppearEvents] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
     dispatch(setAdmin(true));
 
     return () => {
       dispatch(setAdmin(false)); // when leaving page
     };
   }, [dispatch]);

  

  return (
    <div className="flex">
            <aside className={`h-screen bg-white text-[#73301c] flex flex-col justify-between p-6 shadow-xl relative transition-all duration-300
            ${collapsed ? "w-36 f" : "min-w-64"}
            `}>

            {/* Top Section */}
            <div>
                <h2 className="text-2xl font-extrabold mb-10 tracking-wide flex items-center gap-2">
                <MdDashboard size={30} />
                Dashboard
                </h2>

                <nav className={`space-y-3 flex flex-col ${collapsed ? "items-center" : ""}`}>
                    <button
                        className={`w-full flex items-center py-3 rounded-xl font-medium transition-all duration-300
                        ${collapsed ? "justify-center px-0" : "gap-3 px-4 hover:bg-[#73301c] hover:text-white"}`}


                        onClick={()=> {
                            // setCollapsed((prev)=>!prev);
                        }}
                    >
                        <MdDashboard size={30} />
                        {!collapsed && "Commands"}

                    </button>

                    <button
                        className={`w-full flex items-center py-3 rounded-xl font-medium transition-all duration-300
                        ${collapsed ? "justify-center px-0" : "gap-3 px-4 hover:bg-[#73301c] hover:text-white"}`}


                        onClick={()=> {
                            setAddForm(true);
                            setAppearEvents(false);
                                               
                        }
                        }
                    >
                        <MdEvent size={30} />
                        {!collapsed && "New Event"}
                    </button>

                    <button
                        className={`w-full flex items-center py-3 rounded-xl font-medium transition-all duration-300
                        ${collapsed ? "justify-center px-0" : "gap-3 px-4 hover:bg-[#73301c] hover:text-white"}`}


                        onClick={()=> {
                            setAppearEvents(true);
                            setAddForm(false);
                            setCollapsed((prev)=>!prev);
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

            {
                AddForm &&(
                        <div className=" flex items-center justify-center w-[80%]">
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
    </div>
  );
}
