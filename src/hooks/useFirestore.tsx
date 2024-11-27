import { useCallback } from "react";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  //   where,
  updateDoc,
  deleteDoc,
  Firestore,
  //   DocumentData,
  QueryConstraint,
} from "firebase/firestore";
import { FirestoreHook } from "../types";

export const useFirestore = (db: Firestore): FirestoreHook => {
  const createDocument = useCallback(
    async (
      collectionName: string,
      docId: string,
      data: Record<string, any>
    ) => {
      try {
        const docRef = doc(db, collectionName, docId);
        await setDoc(docRef, data);
      } catch (error) {
        console.error("Error creating document:", error);
        throw error;
      }
    },
    [db]
  );

  const getDocument = useCallback(
    async (collectionName: string, docId: string) => {
      try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);

        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
      } catch (error) {
        console.error("Error getting document:", error);
        throw error;
      }
    },
    [db]
  );

  const updateDocument = useCallback(
    async (
      collectionName: string,
      docId: string,
      data: Record<string, any>
    ) => {
      try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, data);
      } catch (error) {
        console.error("Error updating document:", error);
        throw error;
      }
    },
    [db]
  );

  const deleteDocument = useCallback(
    async (collectionName: string, docId: string) => {
      try {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
      } catch (error) {
        console.error("Error deleting document:", error);
        throw error;
      }
    },
    [db]
  );

  const queryDocuments = useCallback(
    async (collectionName: string, constraints: QueryConstraint[]) => {
      try {
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, ...constraints);
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Error querying documents:", error);
        throw error;
      }
    },
    [db]
  );

  return {
    createDocument,
    getDocument,
    updateDocument,
    deleteDocument,
    queryDocuments,
  };
};
