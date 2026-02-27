// import heroImage from "../../assets/images/hero-wedding.jpg";

// const HeroSection: React.FC = () => {
//   return (
//     <section
//       className="relative h-[90vh] bg-cover bg-center flex items-center justify-center text-white"
//       style={{
//         backgroundImage: `url(${heroImage})`,
//       }}
//     >
//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black/50" />

//       {/* Content */}
//       <div className="relative z-10 text-center px-4">
//         <h1 className="text-5xl md:text-6xl font-bold mb-6">
//           Creating Timeless Wedding Memories
//         </h1>
//         <p className="text-lg md:text-xl mb-8">
//           Your dream wedding starts here
//         </p>

//         <button className="bg-yellow-600 hover:bg-yellow-700 transition px-8 py-3 rounded text-white font-semibold">
//           Explore Packages
//         </button>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative h-[90vh] bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Creating Timeless Wedding Memories
        </h1>
        <p className="text-lg md:text-xl">
          Your dream wedding starts here
        </p>
      </div>
    </section>
  );
};

export default HeroSection;