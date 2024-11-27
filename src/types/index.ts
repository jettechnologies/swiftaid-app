import { DocumentData, QueryConstraint } from "firebase/firestore";

export type AuthProvider = "google" | "facebook";
export type FirestoreHook = {
  createDocument: (
    collectionName: string,
    docId: string,
    data: Record<string, any>
  ) => Promise<void>;
  getDocument: (
    collectionName: string,
    docId: string
  ) => Promise<DocumentData | null>;
  updateDocument: (
    collectionName: string,
    docId: string,
    data: Record<string, any>
  ) => Promise<void>;
  deleteDocument: (collectionName: string, docId: string) => Promise<void>;
  queryDocuments: (
    collectionName: string,
    constraints: QueryConstraint[]
  ) => Promise<DocumentData[]>;
};

export type UseSnapshotHook = {
  data: any[];
  error: Error | null;
};

export type Country = {
  name: { common: string }; // Full name
  cca2: string; // Country abbreviation
  flag: string;
};

export type PaginatedCountries = {
  currentPage: number;
  totalPages: number;
  countries: Country[];
};
