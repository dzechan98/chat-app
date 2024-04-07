import { db } from "@/configs/firebase";
import { User } from "@/interfaces";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const checkUserExists = async (userId: string) => {
  const q = query(collection(db, "users"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const docs = querySnapshot.docs.map((doc) => doc.data());
  return docs.length > 0;
};

export const updateUser = async (userId: string, field: User) => {
  const q = query(collection(db, "users"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  let docId = "";
  querySnapshot.forEach((doc) => {
    docId = doc.id;
  });
  if (docId) {
    await updateDoc(doc(db, "users", docId), {
      ...field,
    });
  }
};

export const addUser = async (user: User) => {
  await addDoc(collection(db, "users"), {
    ...user,
  });
};

export const getUserByName = (
  callback: (users: User[]) => void,
  {
    userId,
    keyword,
  }: {
    userId: string;
    keyword: string;
  }
) => {
  const q = query(
    collection(db, "users"),
    where("userId", "!=", userId),
    where("keyword", "array-contains", keyword)
  );

  return onSnapshot(q, (querySnapshot) => {
    if (!querySnapshot.empty) {
      const users = querySnapshot.docs.map((doc) => doc.data());
      callback(users);
    } else {
      callback([] as User[]);
    }
  });
};

export const getUserById = (userId: string, callback: (user: User) => void) => {
  const q = query(
    collection(db, "users"),
    where("userId", "==", userId),
    limit(1)
  );
  return onSnapshot(q, (querySnapshot) => {
    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data() as User;
      callback(user);
    } else {
      callback({} as User);
    }
  });
};

export const getAllUsers = (
  userId: string,
  callback: (uses: User[]) => void
) => {
  const q = query(collection(db, "users"), where("userId", "!=", userId));
  return onSnapshot(q, (querySnapshot) => {
    if (!querySnapshot.empty) {
      const user = querySnapshot.docs.map((doc) => doc.data());
      callback(user);
    } else {
      callback([] as User[]);
    }
  });
};
