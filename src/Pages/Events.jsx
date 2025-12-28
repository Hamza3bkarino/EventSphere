import { useState , useEffect} from "react";
import CardEvent from "../Components/CardEvent";
import axios from "axios";
import FilterEvents from "../Components/Filter";



export default function Events(){

    const [data,setData]=useState([])
    const [filter,setFilter]=useState([])

    
    
    useEffect(()=>{
        axios.get('https://694d4e33ad0f8c8e6e20583d.mockapi.io/event/events')
            .then( res => {
                setData(res.data);
                setFilter(res.data);

            })
            .catch( err => console.log(err))
    },[])
    

    return(
        <>
                
                <div className="mt-30">
                    <FilterEvents events={data} onFilter={setFilter}/>
                </div>
               <div className="grid w-[90%] mx-auto gap-4  place-items-center mt-10
                    grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4">
                        
                {filter.map((item) => (
                    <CardEvent key={item.id} event={item} />
                ))}
                </div>
 
        </>
    )
}