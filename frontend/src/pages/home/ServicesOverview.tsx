import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

interface EventType {
  id: number;
  title: string;
  image: string;
  description: string;
}

const ServicesOverview = () => {

const navigate = useNavigate();

const [events,setEvents] = useState<EventType[]>([]);
const [loading,setLoading] = useState(true);
const [error,setError] = useState<string | null>(null);


useEffect(()=>{

const fetchEvents = async ()=>{

try{

const response = await axios.get<EventType[]>("http://127.0.0.1:8000/api/events");

setEvents(response.data);

}catch(err){

setError("Failed to load services");

}finally{

setLoading(false);

}

};

fetchEvents();

},[]);



const cardVariants = {

hiddenLeft:{
opacity:0,
x:-120
},

hiddenBottom:{
opacity:0,
y:120
},

hiddenRight:{
opacity:0,
x:120
},

visible:{
opacity:1,
x:0,
y:0,
transition:{
duration:0.8
}
}

};



if(loading){
return(
<p className="text-center py-20 text-[#0A1D37]">
Loading services...
</p>
)
}

if(error){
return(
<p className="text-red-500 text-center py-20">
{error}
</p>
)
}



return (

<section className="py-20 bg-[#FCF9F6] font-serif overflow-hidden">


{/* HEADER */}

<motion.div

initial={{opacity:0,y:40}}

whileInView={{opacity:1,y:0}}

transition={{duration:0.6}}

viewport={{once:true}}

className="text-center mb-12"

>

<p className="text-3xl text-[#B18B5E] italic">
~ What We Do ~
</p>

<h2 className="text-4xl md:text-5xl font-bold text-[#0A1D37]">
Our Best Services
</h2>

<div className="mt-4 w-24 h-[2px] bg-[#B18B5E] mx-auto"></div>

</motion.div>



{/* CARDS */}

<div className="flex justify-center">

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl px-6 w-full justify-items-center">

{events.slice(0,3).map((event,index)=>(

<motion.div

key={event.id}

initial={
index === 0
? "hiddenLeft"
: index === 1
? "hiddenBottom"
: "hiddenRight"
}

whileInView="visible"

viewport={{once:true}}

variants={cardVariants}

transition={{duration:0.8,delay:index*0.2}}

whileHover={{scale:1.05}}

className="group relative h-[420px] w-full max-w-[300px] overflow-hidden rounded-sm shadow-md hover:shadow-2xl bg-white border border-[#F2E5D5]"

>


{/* IMAGE */}

<div className="relative w-full h-full transition-all duration-700 group-hover:-translate-y-full">

<img
src={`http://localhost:8000/uploads/events/${event.image}`}
alt={event.title}
className="w-full h-full object-cover"
/>

<div className="absolute bottom-6 left-0 right-0 px-4">

<div className="bg-white py-4 px-2 shadow-lg text-center border border-[#F2E5D5]">

<h3 className="text-lg font-bold text-[#0A1D37] uppercase">

{event.title}

</h3>

</div>

</div>

</div>



{/* HOVER CONTENT */}

<div className="absolute inset-0 bg-[#0A1D37]/95 p-6 flex flex-col justify-center items-center text-center transition-all duration-500 transform translate-y-full group-hover:translate-y-0">

<h3 className="text-xl font-bold text-white mb-4 uppercase">

{event.title}

</h3>

<p className="text-[#D1D1D1] text-xs leading-relaxed mb-6 px-2">

{event.title === "Wedding Event" &&
"Elegant wedding planning with stage decoration, catering, photography and complete event coordination."}

{event.title === "Birthday Party" &&
"Exciting birthday party arrangements with themed decorations, cake setup, balloons and DJ music."}

{event.title === "Traditional Function" &&
"Beautiful traditional ceremony planning with cultural decoration and rituals."}

</p>

<button

onClick={()=>navigate(`/event/${event.id}`)}

className="border-b border-[#B18B5E] text-[#B18B5E] pb-1 text-[10px] font-bold tracking-[0.2em] uppercase hover:text-white"

>

READ MORE

</button>

</div>

</motion.div>

))}

</div>

</div>



{/* BUTTON */}

<motion.div

initial={{opacity:0,y:40}}

whileInView={{opacity:1,y:0}}

transition={{duration:0.6}}

viewport={{once:true}}

className="mt-16 text-center"

>

<button

onClick={()=>{

navigate('/headerservice');
window.scrollTo(0,0);

}}

className="px-10 py-3 border border-[#B18B5E] text-[#B18B5E] font-bold text-xs tracking-[0.3em] uppercase hover:bg-[#B18B5E] hover:text-white rounded-full"

>

Explore All Services

</button>

</motion.div>

</section>

);

};

export default ServicesOverview;