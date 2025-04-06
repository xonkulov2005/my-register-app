import { useState } from "react";
import { useGlobalContext } from "./useGlobalContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import toast from "react-hot-toast";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useLogout = () => {
  const { dispatch, user } = useGlobalContext();
  const [isPending, setIsPending] = useState(false);

  const logout = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        online: false,
      });
      setIsPending(true);
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      toast.success(`See you soon )`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };
  return { logout, isPending };
};
