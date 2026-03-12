import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { User, Mail, Phone, MessageSquare, ChevronDown, Instagram, Youtube, Facebook, Linkedin, Twitter } from "lucide-react";

interface Service {
  id: number;
  title: string;
}

const ContactPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Select Service");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
const [showSuccess,setShowSuccess] = useState(false);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get<Service[]>("/services");
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  }, []);

 const handleSubmit = async (e: React.FormEvent) => {

  e.preventDefault();

  try {

    await axiosInstance.post("/contact",{
      name,
      email,
      phone,
      service:selectedService,
      message
    });

    setShowSuccess(true);

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setSelectedService("Select Service");

  } catch (error) {
    console.error(error);
  }

};

  return (
    <div className="bg-white min-h-screen">
      {/* 1. KUTTY BANNER (Top Section) */}
   <div className="relative h-56 md:h-72 flex items-center justify-center border-b-4 border-[#c89b6d]">

  {/* Background Image */}
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHwoKYpl09sHDvLyCoJP6VImjN0wV24FLI-Yhpa2-Sdg&s"
    alt="Contact Banner"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Text */}
  <div className="relative text-center">
    <h1 className="text-3xl md:text-5xl font-serif font-bold text-white uppercase tracking-widest">
      Contact Us
    </h1>
  </div>

</div>
   

      <section className="max-w-7xl mx-auto py-12 px-6">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT SIDE: INFO (Like Melodia Design) */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-[#0A1D37] mb-8">WANT TO WORK WITH US?</h2>
              
              <div className="space-y-10">
                {/* Phone */}
                <div className="flex items-center gap-6">
                  <div className="text-[#c89b6d]"><Phone size={32} strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Talk to our team</p>
                    <p className="text-2xl font-bold text-[#0A1D37]">91 98765 43210</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-6">
                  <div className="text-[#c89b6d]"><Mail size={32} strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Write to us</p>
                    <p className="text-xl font-bold text-[#0A1D37]">kvplanners@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons (Like Image 4) */}
            <div className="flex gap-4">

<a href="#" className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center text-white shadow-md hover:scale-110 transition">
<Instagram size={20}/>
</a>

<a href="#" className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-md hover:scale-110 transition">
<Youtube size={20}/>
</a>

<a href="#" className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md hover:scale-110 transition">
<Facebook size={20}/>
</a>

<a href="#" className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white shadow-md hover:scale-110 transition">
<Linkedin size={20}/>
</a>

<a href="#" className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shadow-md hover:scale-110 transition">
<Twitter size={20}/>
</a>

</div>

            {/* Branch Locations (Map Placeholders) */}
            <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="border-l-4 border-[#c89b6d] pl-4">
                  <h4 className="font-bold text-[#0A1D37]">CHENNAI MAIN</h4>
                  <p className="text-sm text-gray-500">Anna Nagar, West Tower, Chennai.</p>
               </div>
               <div className="border-l-4 border-[#c89b6d] pl-4">
                  <h4 className="font-bold text-[#0A1D37]">MADURAI BRANCH</h4>
                  <p className="text-sm text-gray-500">KK Nagar, Near Temple, Madurai.</p>
               </div>
            </div>
          </div>

          {/* RIGHT SIDE: THE FORM (White Background, Clean Outlines) */}
          {/* RIGHT SIDE FORM */}
    <div className="bg-white p-6 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100">
      
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          value={name}
          onChange={(e)=>setName(e.target.value)}
          type="text"
          placeholder="Enter your Full Name"
          className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:border-[#c89b6d]"
        />

        <input
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          type="text"
          placeholder="Enter your Phone Number"
          className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:border-[#c89b6d]"
        />

        <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type="email"
          placeholder="Enter your Email Address"
          className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:border-[#c89b6d]"
        />

        {/* SERVICE */}
        <div className="relative">
          <div
            onClick={()=>setIsOpen(!isOpen)}
            className="w-full border border-gray-200 p-3 flex justify-between items-center rounded-lg cursor-pointer text-gray-400"
          >
            {selectedService}
            <ChevronDown size={18}/>
          </div>

          {isOpen && (
            <ul className="absolute left-0 top-full w-full bg-white border shadow-lg z-50 max-h-48 overflow-y-auto mt-1 rounded-lg">
              {services.map((service)=>(
                <li
                  key={service.id}
                  onClick={()=>{
                    setSelectedService(service.title)
                    setIsOpen(false)
                  }}
                  className="p-3 hover:bg-[#fdf8f3] hover:text-[#c89b6d] cursor-pointer"
                >
                  {service.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <textarea
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          placeholder="Tell us about your requirements"
          rows={3}
          className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:border-[#c89b6d]"
        />

        <button
          type="submit"
          className="bg-[#0A1D37] text-white px-8 py-3 rounded-lg font-bold tracking-widest hover:bg-[#c89b6d]"
        >
          SUBMIT
        </button>

      </form>
    </div>
        </div>
      </section>
{/* SUCCESS POPUP */}
{showSuccess && (

<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

  <div className="bg-white p-8 rounded-xl shadow-xl text-center w-[350px]">

    <h2 className="text-2xl font-bold text-green-600 mb-2">
      Success 🎉
    </h2>

    <p className="text-gray-600 mb-6">
      Your message has been sent successfully.
    </p>

    <button
      onClick={()=>setShowSuccess(false)}
      className="bg-[#0A1D37] text-white px-6 py-2 rounded-lg hover:bg-[#c89b6d]"
    >
      OK
    </button>

  </div>

</div>

)}

      {/* 3. FULL WIDTH MAP AT BOTTOM */}
      {/* <div className="h-96 w-full filter grayscale hover:grayscale-0 transition-all duration-1000">
        <iframe
          src="http://googleusercontent.com/maps.google.com/3"
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
        ></iframe>
      </div> */}
    </div>
  );
};

export default ContactPage;