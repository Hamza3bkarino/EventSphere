import axios from "axios";
import { useEffect, useState } from "react";
import CardEvent from "../Components/CardEvent";


export default function Home() {
  const [data,setData]=useState([]);

  useEffect(()=>{
          axios.get('https://694d4e33ad0f8c8e6e20583d.mockapi.io/event/events')
              .then( res => {
                  setData(res.data);  
              })
              .catch( err => console.log(err))
      },[])

  return (
    <>
    
      <section className="bg-img min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center text-center px-6">

          <h1 className="text-4xl md:text-7xl font-extrabold text-white max-w-4xl leading-tight drop-shadow-lg">
            Your Gateway to Unforgettable Events
          </h1>

          <p className="mt-6 text-base md:text-md text-white max-w-xl drop-shadow-md">
            Explore concerts, sports, shows, and cultural events.
            Book your tickets online and get instant confirmation by email.
          </p>

          {/* CTA */}
          <div className="mt-8 flex gap-4">
            <a
              href="#events"
              className="bg-[#73301c] hover:bg-[#853016] text-white px-8 py-3 rounded-md font-semibold transition shadow-lg"
            >
              Browse Events
            </a>

            <a
              href="#contact"
              className="bg-white/90 text-[#73301c] px-8 py-3 rounded-md font-semibold hover:bg-white transition shadow-lg"
            >
              Contact Us
            </a>
          </div>

        </div>
      </section>


      <section>

          <h1 
            className="text-[50px] font-bold text-center mt-20 "
          > 
            Best Events 
          </h1>
          <div className="grid w-[90%] mx-auto gap-4  place-items-center mt-10
                              grid-cols-1 
                              sm:grid-cols-2 
                              md:grid-cols-3 
                              lg:grid-cols-4">
                                  
                          {data.map((item) => (
                              item.id <=8 && ( 
                                <CardEvent key={item.id} event={item} />
                              )
                          ))}
          </div>
      </section>
    </>
  );
}
