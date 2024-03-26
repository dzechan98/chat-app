import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { signOut } = useAuth();
  return <div className="cursor-pointer" onClick={signOut}></div>;
};

export default Home;
