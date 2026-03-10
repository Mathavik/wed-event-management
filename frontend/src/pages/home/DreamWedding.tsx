import React from 'react';
import { motion } from "framer-motion";
import aboutImage from "../../assets/about1.jpg"; 

const WeddingServices = () => {

const eventFeatures = [
{ title: "Grand Weddings", desc: "Curating bespoke luxury weddings from engagement to the grand reception." },
{ title: "Corporate Galas", desc: "Professional event management for product launches and corporate milestones." },
{ title: "Social Celebrations", desc: "Vibrant birthday bashes, anniversaries, and intimate family gatherings." },
{ title: "Theme Decors", desc: "Innovative and traditional floral arrangements tailored to your vision." }
];

return (

<section className="py-16 bg-white font-sans overflow-hidden">

<motion.div
initial={{ opacity: 0, y: 120 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: "easeOut" }}
viewport={{ once: true }}
className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-start gap-12"
>

{/* LEFT IMAGE */}

<motion.div 
initial={{ opacity: 0, x: -100 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8 }}
viewport={{ once: true }}
className="w-full lg:w-1/2"
>

<div className="relative rounded-[2rem] overflow-hidden shadow-xl">

<img
src={aboutImage}
alt="Luxury Event Decor"
className="w-full h-[450px] md:h-[550px] object-cover"
/>

</div>

</motion.div>



{/* RIGHT CONTENT */}

<motion.div
initial={{ opacity: 0, x: 100 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8 }}
viewport={{ once: true }}
className="w-full lg:w-1/2 pt-2"
>

<p
className="text-center italic text-2xl mb-2"
style={{
fontFamily: "Georgia, serif",
color: "#b08a5b"
}}
>
~ About Us ~
</p>

<h2
className="text-center text-5xl md:text-6xl font-bold mb-4"
style={{
fontFamily: "Georgia, serif",
color: "#0f2235"
}}
>
Crafting Beautiful Celebrations
</h2>

<div className="flex justify-center mb-8">
<div className="w-24 h-[2px]" style={{ background: "#b08a5b" }}></div>
</div>

<p className="text-gray-500 text-base leading-relaxed max-w-xl mb-4">
At <strong>Kalyana Vaibhogam</strong>, we specialize in creating unforgettable celebrations filled with elegance, beauty, and joy.
</p>

<p className="text-gray-500 text-base leading-relaxed max-w-xl">
From weddings and birthdays to traditional ceremonies and corporate events, we deliver exceptional experiences.
</p>

</motion.div>

</motion.div>

</section>

);

};

export default WeddingServices;