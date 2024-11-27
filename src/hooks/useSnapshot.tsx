import { useEffect, useState } from "react";
import {
  Firestore,
  onSnapshot,
  collection,
  doc,
  QueryConstraint,
  query,
} from "firebase/firestore";
import { UseSnapshotHook } from "../types";

export const useSnapshot = (
  db: Firestore,
  collectionName: string,
  constraints: QueryConstraint[] = []
): UseSnapshotHook => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      },
      (err) => {
        setError(err);
      }
    );

    return () => unsubscribe();
  }, [db, collectionName, constraints]);

  return { data, error };
};
