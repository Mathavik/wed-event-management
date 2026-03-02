import { useParams } from "react-router-dom";

const ServiceProvider = () => {
  const { id } = useParams();

  return (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-bold">
        Service Providers for Service ID: {id}
      </h1>
    </div>
  );
};

export default ServiceProvider;