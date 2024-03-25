import { db } from "@/configs/firebase";
import { User } from "@/interfaces";
import { addDoc, collection } from "firebase/firestore";

export const addUser = async (user: User) => {
  await addDoc(collection(db, "users"), {
    ...user,
  });
};
