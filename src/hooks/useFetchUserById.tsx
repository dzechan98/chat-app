import { useEffect, useState } from "react";
import { getUserById } from "@/apis";
import { User } from "@/interfaces";

const useFetchUserById = (userId: string) => {
  const [infoUser, setInfoUser] = useState<User>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubcribe = getUserById(userId, (user) => {
      setInfoUser(user);
      setLoading(false);
    });

    return unsubcribe;
  }, []);

  return {
    infoUser,
    loading,
  };
};

export default useFetchUserById;
