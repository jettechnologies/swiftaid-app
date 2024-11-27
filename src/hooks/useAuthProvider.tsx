import { useCallback } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  User,
} from "firebase/auth";
import { Firestore, doc, setDoc, getDoc } from "firebase/firestore";
import { AuthProvider } from "../types";

type UseAuthProviderHook = {
  handleProviderSignIn: (provider: AuthProvider) => Promise<User | null>;
};

export const useAuthProvider = (db: Firestore): UseAuthProviderHook => {
  const auth = getAuth();

  const handleProviderSignIn = useCallback(
    async (provider: AuthProvider) => {
      try {
        const providerInstance =
          provider === "google"
            ? new GoogleAuthProvider()
            : new FacebookAuthProvider();

        const result = await signInWithPopup(auth, providerInstance);
        const user = result.user;

        if (!user) {
          throw new Error("Failed to sign in with provider");
        }

        // Check if user exists in Firestore
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          // Add user to Firestore if not already there
          await setDoc(userRef, {
            uid: user.uid,
            fullname: user.providerData[0].displayName ?? "",
            username: "",
            contact: user.providerData[0].phoneNumber ?? "",
            email: user.email,
            country: "",
            dob: "",
            occupation: "",
            profileImg: "",
            createdAt: new Date().toISOString(),
          });
        }

        return user;
      } catch (error) {
        console.error("Error signing in with provider:", error);
        throw error;
      }
    },
    [auth, db]
  );

  return { handleProviderSignIn };
};
