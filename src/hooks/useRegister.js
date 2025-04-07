import { useState } from "react";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useGlobalContext } from "./useGlobalContext";
import toast from "react-hot-toast";
import { setDoc, doc } from "firebase/firestore";

export const useRegister = () => {
  const { dispatch } = useGlobalContext();
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);

  const register = async (displayName, email, password) => {
    try {
      setIsPending(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName,
        photoURL: `https://api.dicebear.com/9.x/open-peeps/svg?seed=${displayName}`,
      });

      const user = res.user;

      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName,
        photoURL: user.photoURL,
        online: true,
      });

      toast.success(`Welcome ${user.displayName}`);
      dispatch({ type: "LOGIN", payload: user });
      setData(user);
    } catch (error) {
      toast.error(error.message);
      console.log("Register error:", error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, data, register };
};
