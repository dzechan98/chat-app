import { paths } from "@/constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(paths.chat);
    }, 0);

    return () => clearTimeout(timeout);
  }, [navigate]);
  return <div></div>;
};

export default Home;
