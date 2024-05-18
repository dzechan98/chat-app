/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getUserById } from "@/apis";
import { User } from "@/interfaces";

const useFetchUserById = (userId?: string, callback?: () => void) => {
  const [infoUser, setInfoUser] = useState<User>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubcribe;
    if (userId) {
      unsubcribe = getUserById(userId, (user) => {
        setInfoUser(user);
        setLoading(false);
        callback?.();
      });
    }

    return unsubcribe;
  }, [userId]);

  return {
    infoUser,
    loading,
  };
};

export default useFetchUserById;
