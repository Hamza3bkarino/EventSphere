import { useDispatch, useSelector } from "react-redux";
import { MdOutlineModeEdit } from "react-icons/md"; 
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import EditEvent from "./Admin/EditEvent";
import DeleteEvent from "./Admin/DeleteEvent";
import axios from "axios";
import toast from "react-hot-toast";
import { toggleUpdatePage } from "../lib/Redux/AdminSlice";
import {AddToCart} from '../lib/Redux/CartSlice'


export default function CardEvent({ event }) {

  const isAdmin = useSelector((state) => state.admin.isAdmin);
  const [edit, setEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleConfirm = async () => {
    setLoading(true);

    try {
      await axios.delete(
        `https://694d4e33ad0f8c8e6e20583d.mockapi.io/event/events/${event.id}`
      );

      toast.success("Event deleted successfully!", {
        duration: 3000,
      });
      dispatch(toggleUpdatePage());
      setShowDelete(false);

    } catch (error) {
      console.error(error);

      toast.error("Failed to delete event. Try again.", {
        duration: 3000,
      });
      

    } finally {
      setLoading(false); 
    }
};


  return (
    <>
      <div className="
        w-full
        max-w-xs
        sm:max-w-sm
        md:max-w-xs
        shadow-xl
        bg-white
        rounded-sm
        mt-10
        overflow-hidden
        hover:shadow-2xl
        transition-shadow
        duration-300
      ">
        {/* Image */}
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-44 sm:h-48 object-cover"
          />

          {/* Category */}
          <span className="absolute top-3 left-3 bg-[#73301c] text-white text-xs px-3 py-1 rounded-sm">
            {event.category}
          </span>

          {/* Date */}
          <span className="absolute top-3 right-3 bg-white text-[#73301c] text-xs px-3 py-1 rounded-sm">
            {event.date}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-gray-800 truncate">
            {event.title}
          </h2>

          <p className="text-sm text-gray-600 line-clamp-2">
            {event.description}
          </p>

          <div className="flex justify-between items-center mt-3">
            <p className="text-sm font-semibold text-[#73301c]">
              Price: ${event.price}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              {event.ticketsAvailable} tickets
            </p>
          </div>

          {isAdmin ? (
            <div className="flex justify-end gap-3 mt-3">
              <button
                className="p-2 rounded-full hover:bg-gray-100 text-[#73301c]"
                onClick={() => setEdit(true)}
              >
                <MdOutlineModeEdit size={20} />
              </button>

              <button
                className="p-2 rounded-full hover:bg-red-100 text-red-600"
                onClick={() => setShowDelete(true)}
              >
                <RiDeleteBin5Line size={20} />
              </button>
            </div>
          ) : (
            <button className="w-full mt-3 bg-[#73301c] text-white py-2 rounded-lg text-sm sm:text-base"
              onClick={()=> dispatch(AddToCart(event))}
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>

      {/* Modals */}
      {edit && (
        <EditEvent data={event} onClose={() => setEdit(false)} />
      )}

      {showDelete && (
        <DeleteEvent
          onClose={() => setShowDelete(false)}
          onConfirm={handleConfirm}
          loading={loading}
        />
      )}
    </>
  );
}
