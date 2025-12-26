import axios from "axios"
import { useEffect, useState } from "react"
import CardEvent from "../CardEvent"
import { useSelector } from "react-redux"
import FilterEvents from "../Filter"



export default function AdminEvents(){
    const [data,setData]=useState([])
    // const [filter,setFilter]=useState([])
    const updatePage = useSelector((state) => state.admin.updatePage);
    console.log(updatePage);
    
    
    useEffect(()=>{
        axios.get('https://694d4e33ad0f8c8e6e20583d.mockapi.io/event/events')
            .then( res => {
                setData(res.data);
                // setFilter(res.data);
            })
            .catch( err => console.log(err))
    },[updatePage])
    

    return(
        <>
                {/* <FilterEvents events={data} onFilter={setFilter}/> */}
               <div className="grid w-full gap-4  place-items-center
                    grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4">
                {data.map((item) => (
                    <CardEvent key={item.id} event={item} />
                ))}
                </div>
 
        </>
    )
}