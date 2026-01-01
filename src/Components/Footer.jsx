import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Footer() {
    const isAdmin = useSelector((state)=>state.admin.isAdmin)

  return (
    <>
    {
      !isAdmin &&(
           <footer className="bg-[#73301c] text-white mt-20">
              <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* BRAND */}
                <div>
                  <h2 className="text-2xl font-extrabold mb-4 tracking-wide">
                    YourBrand
                  </h2>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Creating unforgettable experiences and premium products with
                    passion, quality, and elegance.
                  </p>
                </div>

                {/* LINKS */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="hover:text-white cursor-pointer">Home</li>
                    <li className="hover:text-white cursor-pointer">Events</li>
                    <li className="hover:text-white cursor-pointer">Shop</li>
                    <li className="hover:text-white cursor-pointer">Contact</li>
                  </ul>
                </div>

                {/* SUPPORT */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Support</h3>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="hover:text-white cursor-pointer">Help Center</li>
                    <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                    <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
                  </ul>
                </div>

                {/* CONTACT */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Contact</h3>
                  <p className="text-sm text-white/80 mb-4">
                    📍 Casablanca, Morocco <br />
                    ✉️ contact@yourbrand.com
                  </p>

                  <div className="flex gap-4">
                    <a className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-[#73301c] transition">
                      <FaFacebookF />
                    </a>
                    <a className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-[#73301c] transition">
                      <FaInstagram />
                    </a>
                    <a className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-[#73301c] transition">
                      <FaTwitter />
                    </a>
                    <a className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-[#73301c] transition">
                      <FaEnvelope />
                    </a>
                  </div>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="border-t border-white/20 py-4 text-center text-sm text-white/70">
                © {new Date().getFullYear()} YourBrand. All rights reserved.
              </div>
            </footer>
      )
    }
    </>
   
  );
}
