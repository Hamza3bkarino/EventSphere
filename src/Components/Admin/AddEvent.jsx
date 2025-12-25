import { useRef, useState } from "react";
import { MdTitle, MdImage, MdCategory, MdDateRange, MdLocationOn, MdAttachMoney } from "react-icons/md";
import { FaRegFileAlt, FaTicketAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";


export default function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: "",
    date: "",
    location: "",
    price: 250,
    description: "",
    ticketsAvailable: "",
  });
  

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null); // image preview
  const [errors, setErrors] = useState({}); // store all errors


   const uploadToCloudinary = async (file) => {
      const data = new FormData();
      data.append("file", file);
      data.append(
        "upload_preset",
        UPLOAD_PRESET
      );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();

  if (!res.ok) {
    console.error("Cloudinary error:", result);
    return null;
  }

  return result.secure_url;
};

 


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
      setErrors({ ...errors, image: "" }); // clear image error
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" }); // clear error for this field
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!formData.title.trim()) newErrors.title = "Title is required!";
  if (!formData.category.trim()) newErrors.category = "Category is required!";
  if (!formData.date) newErrors.date = "Date is required!";
  if (!formData.location.trim()) newErrors.location = "Location is required!";
  if (!formData.description.trim()) newErrors.description = "Description is required!";
  if (!formData.ticketsAvailable) newErrors.ticketsAvailable = "Tickets are required!";
  if (!formData.image) newErrors.image = "Image is required!";

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) return;

  try {


    const imageUrl = await uploadToCloudinary(formData.image);

    const payload = {
      ...formData,
      image: imageUrl,
    };

    const res = await axios.post(
      "https://694d4e33ad0f8c8e6e20583d.mockapi.io/event/events",
      payload
    );
    
    toast.success("Event added successfully!",{
        duration:3000,
      }
    );

    setFormData({
      title: "",
      category: "",
      date: "",
      location: "",
      description: "",
      ticketsAvailable: "",
      image: null,
    });
    
    setPreview(null)
    fileInputRef.current.value = "";


    setErrors({});

  } catch (error) {
    console.error("Submit failed:", error);
    toast.error("Something went wrong!");

  }
};


  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-[#73301c]/20">
      <h2 className="text-2xl font-extrabold text-[#73301c] mb-6 text-center">Add New Event</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 border rounded-sm p-2.5 focus-within:ring-2 focus-within:ring-[#73301c] transition">
            <MdTitle className="text-[#73301c] w-6 h-6" />
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full outline-none text-sm"
            />
          </div>
        </div>
          {errors.title && <p className="text-red-500 text-xs -mt-2 ml-1">{errors.title}</p>}

        {/* Category & Date */}
        <div className="flex gap-3">
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2 border rounded-sm p-2.5 focus-within:ring-2 focus-within:ring-[#73301c] transition">
              <MdCategory className="text-[#73301c] w-5 h-5" />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="w-full outline-none text-sm"
              />
            </div>
            {errors.category && <p className="text-red-500 text-xs mt-2 ml-2">{errors.category}</p>}
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2 border rounded-sm p-2.5 focus-within:ring-2 focus-within:ring-[#73301c] transition">
              <MdDateRange className="text-[#73301c] w-5 h-5" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full outline-none text-sm"
              />
            </div>
            {errors.date && <p className="text-red-500 text-xs mt-2 ml-2">{errors.date}</p>}
          </div>
        </div>

        {/* Location & Price */}
        <div className="flex gap-3">
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2 border rounded-sm p-2.5 focus-within:ring-2 focus-within:ring-[#73301c] transition">
              <MdLocationOn className="text-[#73301c] w-5 h-5" />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full outline-none text-sm"
              />
            </div>
            {errors.location && <p className="text-red-500 text-xs mt-2 ml-2">{errors.location}</p>}
          </div>
          
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2 border rounded-sm p-2.5 focus-within:ring-2 focus-within:ring-[#73301c] transition">
              <MdAttachMoney className="text-[#73301c] w-5 h-5" />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full outline-none text-sm"
              />
            </div>
            {/* Empty space keeps alignment consistent */}
            <p className="text-xs mt-2 ml-2 invisible">invisible p</p>
          </div>
          </div>

        {/* Description */}
        <div className="flex items-start gap-3 border rounded-sm p-2.5 focus-within:ring-2 focus-within:ring-[#73301c] transition">
          <FaRegFileAlt className="text-[#73301c] w-5 h-5 mt-1" />
          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full outline-none text-sm resize-none"
          />
        </div>
        {errors.description && <p className="text-red-500 text-xs mt-2 ml-2">{errors.description}</p>}


        {/* Tickets */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 border rounded-sm p-2.5 focus-within:ring-2 focus-within:ring-[#73301c] transition">
            <FaTicketAlt className="text-[#73301c] w-5 h-5" />
            <input
              type="number"
              name="ticketsAvailable"
              placeholder="Tickets Available"
              value={formData.ticketsAvailable}
              onChange={handleChange}
              className="w-full outline-none text-sm"
            />
          </div>
        </div>
          {errors.ticketsAvailable && <p className="text-red-500 text-xs -mt-2 ml-1">{errors.ticketsAvailable}</p>}

        {/* Image Upload */}
        <div className="flex flex-col gap-2 border rounded-sm p-2.5 focus-within:ring-2 focus-within:ring-[#73301c] transition">
          <div className="flex items-center gap-3">
            <MdImage className="text-[#73301c] w-6 h-6" />
            <input
              type="file"
              name="image"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleChange}
              className="w-full text-sm outline-none"
            />
          </div>
          {preview && (
            <div className="flex items-center space-x-4 mt-2">
              <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-md border" />
              <IoClose
                className="w-6 h-6 text-[#73301c] cursor-pointer hover:text-red-500 transition"
                onClick={() => {
                  setFormData({ ...formData, image: null });
                  setPreview(null);
                  fileInputRef.current.value = "";

                }}
              />
            </div>
          )}
        </div>
          {errors.image && <p className="text-red-500 text-xs -mt-2 ml-1">{errors.image}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#73301c] text-white py-3 rounded-sm font-semibold hover:bg-[#5e2616] transition"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}
