import { useState } from "react";
import { useGlobalContext } from "./useGlobalContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import toast from "react-hot-toast";
import { doc, updateDoc } from "firebase/firestore";

export const useLogout = () => {
  const { dispatch, user } = useGlobalContext();
  const [isPending, setIsPending] = useState(false);

  const logout = async () => {
    try {
      setIsPending(true);
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        online: false,
      });

      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      toast.success("See you soon 👋");
    } catch (error) {
      toast.error(error.message);
      console.log("Logout error:", error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { logout, isPending };
};
