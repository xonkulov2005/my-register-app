import { useState } from "react";
import { useGlobalContext } from "./useGlobalContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import toast from "react-hot-toast";

export const useLogout = () => {
  const { dispatch } = useGlobalContext();
  const [isPending, setIsPending] = useState(false);

  const logout = async () => {
    try {
      setIsPending(true);
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      toast.success(`See you soon )`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };
  return { logout, isPending };
};
