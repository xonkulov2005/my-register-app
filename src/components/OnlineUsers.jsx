import { useCollection } from "../hooks/useCollaction";

function OnlineUsers() {
  const { data: users } = useCollection("users");

  return (
    <div className="main-container mt-5">
      {users &&
        users.map((u) => (
          <h1 key={u.id}>
            {u.displayName} - {u.online ? "online" : "offline"}
          </h1>
        ))}
    </div>
  );
}

export default OnlineUsers;
