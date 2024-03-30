import { db } from "@/configs/firebase";
import { Room } from "@/interfaces";
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

export const getRoom = async (
  userId1: string,
  userId2: string
): Promise<Room> => {
  try {
    const q1 = query(
      collection(db, "rooms"),
      where("members", "array-contains", userId1)
    );
    const q2 = query(
      collection(db, "rooms"),
      where("members", "array-contains", userId2)
    );

    const [resultUser1, resultUser2] = await Promise.all([
      getDocs(q1),
      getDocs(q2),
    ]);
    const docsUser1 = resultUser1.docs.map((doc) => doc.data());
    const docsUser2 = resultUser2.docs.map((doc) => doc.data());
    const commonDocs = docsUser1.filter((doc1) =>
      docsUser2.some((doc2) => doc2.roomId === doc1.roomId)
    );

    return commonDocs[0] as Room;
  } catch (error) {
    console.error(error);
    return {} as Room;
  }
};

export const createAndGetRoom = async (room: Room) => {
  try {
    const q1 = query(
      collection(db, "rooms"),
      where("members", "array-contains", room.members[0])
    );
    const q2 = query(
      collection(db, "rooms"),
      where("members", "array-contains", room.members[1])
    );

    const [resultUser1, resultUser2] = await Promise.all([
      getDocs(q1),
      getDocs(q2),
    ]);
    const docsUser1 = resultUser1.docs.map((doc) => doc.data());
    const docsUser2 = resultUser2.docs.map((doc) => doc.data());
    const commonDocs = docsUser1.filter((doc1) =>
      docsUser2.some((doc2) => doc2.roomId === doc1.roomId)
    );

    if (commonDocs.length > 0) {
      return commonDocs[0] as Room;
    }

    await addDoc(collection(db, "rooms"), {
      ...room,
    });
    return room;
  } catch (error) {
    console.log(error);
    return {} as Room;
  }
};

export const getRoomById = (roomId: string, callback: (room: Room) => void) => {
  const q = query(
    collection(db, "rooms"),
    where("roomId", "==", roomId),
    limit(1)
  );
  return onSnapshot(q, (querySnapshot) => {
    if (!querySnapshot.empty) {
      const room = querySnapshot.docs[0].data() as Room;
      callback(room);
    } else {
      callback({} as Room);
    }
  });
};

export const updateRoom = async (roomId: string, field: Room) => {
  const q = query(
    collection(db, "rooms"),
    where("roomId", "==", roomId),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  let docId = "";
  querySnapshot.forEach((doc) => {
    docId = doc.id;
  });

  if (docId) {
    await updateDoc(doc(db, "rooms", docId), {
      ...field,
    });
  }
};
