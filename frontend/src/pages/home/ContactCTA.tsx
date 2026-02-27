import { useNavigate } from "react-router-dom";

const ContactCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-yellow-600 text-center text-white">
      <h2 className="text-4xl font-bold mb-6">
        Ready To Plan Your Dream Wedding?
      </h2>
      <button
        onClick={() => navigate("/contact")}
        className="bg-white text-yellow-600 px-8 py-3 font-bold rounded"
      >
        Contact Us Today
      </button>
    </section>
  );
};

export default ContactCTA;