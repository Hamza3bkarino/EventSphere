import { useSelector } from "react-redux";
import { MdOutlineModeEdit } from "react-icons/md"; 
import { RiDeleteBin5Line } from "react-icons/ri";
import {  useState } from "react";
import EditEvent from "./Admin/EditEvent";


export default function CardEvent({ event }) {

  const isAdmin = useSelector((state)=> state.admin.isAdmin);
  const [edit,setEdit] = useState(false)


  return (
    <div className="max-w-xs min-w-xs shadow-xl bg-white rounded-sm mt-10 overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-[#73301c] text-white text-xs font-semibold px-3 py-1 rounded-sm shadow-md">
          {event.category}
        </span>
        {/* Date Badge */}
        <span className="absolute top-3 right-3 bg-white text-[#73301c] text-xs font-semibold px-3 py-1 rounded-sm shadow-md">
          {event.date}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold text-gray-800 truncate">{event.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>

        {/* Price & Tickets */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-sm font-semibold text-[#73301c]">Price: ${event.price}</p>
          <p className="text-sm text-gray-500">{event.ticketsAvailable} tickets</p>
        </div>
        {isAdmin ? (
          <div className="flex justify-end gap-3 mt-3">
            <button className="p-2 rounded-full hover:bg-gray-100 text-[#73301c]" 
              onClick={
                ()=> setEdit(true)
              }
            >
              <MdOutlineModeEdit size={20} />
            </button>

            <button className="p-2 rounded-full hover:bg-red-100 text-red-600">
              <RiDeleteBin5Line size={20} />
            </button>
          </div>
        ) : (
          <button className="w-full mt-3 bg-[#73301c] text-white py-2 rounded-lg font-medium hover:bg-[#5e2616] transition-colors">
            Book Now
          </button>
        )}

      </div>


      {
        edit && (
          <EditEvent data={event} onClose={()=> setEdit(false)}/>
        )
      }
    </div>

  );
}
