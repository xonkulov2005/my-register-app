import { useState } from "react";
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useGlobalContext } from "./useGlobalContext";
import toast from "react-hot-toast";
import { doc, updateDoc } from "firebase/firestore";

export const useLogin = () => {
  const { dispatch } = useGlobalContext();
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);

  const login = async (email, password) => {
    try {
      setIsPending(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        online: true,
      });

      toast.success(`Welcome back ${user.displayName}`);
      dispatch({ type: "LOGIN", payload: user });
      setData(user);
    } catch (error) {
      toast.error(error.message);
      console.log("Login error:", error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, data, login };
};
