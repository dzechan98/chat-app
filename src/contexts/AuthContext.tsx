import { createContext, useContext, useEffect, useState } from "react";
import { auth, SignOutUser } from "@/configs/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { getDataFromLocalStorage, saveDataToLocalStorage } from "@/utils";
import { updateUser } from "@/apis";
import moment from "moment";

type UserContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  signOut: () => void;
};

const AuthContext = createContext<UserContextType>({} as UserContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    getDataFromLocalStorage("user")
  );

  const signOut = async () => {
    if (currentUser) {
      await SignOutUser();
      setCurrentUser(null);
      saveDataToLocalStorage("user", null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user);
      if (user) {
        saveDataToLocalStorage("user", user);
        updateUser(user.uid, {
          time: moment(new Date()).format(),
        });
      } else {
        saveDataToLocalStorage("user", null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): UserContextType => {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
