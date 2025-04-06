import React from "react";
import { useCollection } from "../hooks/useCollaction";
function OnlineUsers() {
  const { data: user } = useCollection("users");

  return (
    <div className="main-container mt-5">
      {user &&
        user.map((u) => {
          return (
            <h1 key={u.id}>
              {user.dispalyName}-{user.online ? "online" : "offline"}
            </h1>
          );
        })}
    </div>
  );
}

export default OnlineUsers;
