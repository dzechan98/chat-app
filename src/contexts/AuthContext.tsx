import { createContext, useContext, useEffect, useState } from "react";
import { auth, SignOutUser } from "@/configs/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "@/utils/localStorageUtil";

type UserContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  signOut: () => void;
};

const AuthContext = createContext<UserContextType>({} as UserContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    getDataFromLocalStorage("user")
  );

  const signOut = () => {
    SignOutUser();
    setCurrentUser(null);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    saveDataToLocalStorage("user", currentUser);
  }, [currentUser]);

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

export default AuthProvider;
