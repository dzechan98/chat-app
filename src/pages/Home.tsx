import { useAuth } from "@/contexts/AuthContext";
import DefaultLayout from "@/layouts/DefaultLayout";
import React from "react";

const Home = () => {
  const { signOut } = useAuth();
  return (
    <DefaultLayout>
      <div className="cursor-pointer" onClick={signOut}>
        sign out
      </div>
    </DefaultLayout>
  );
};

export default Home;
