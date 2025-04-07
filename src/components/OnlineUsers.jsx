import { useCollection } from "../hooks/useCollaction";

function OnlineUsers() {
  const { data: users } = useCollection("users");

  return (
    <div className="main-container mt-5">
      <div className="hero bg-base-200 min-h-screen">
        <div className="flex flex-col gap-5">
          {users &&
            users.map((u) => (
              <div key={u.id} className="flex">
                <img
                  src={u.photoURL}
                  className="max-w-12 rounded-lg shadow-2xl mr-3"
                />
                <h2 className="text-xl font-bold mt-2 btn btn-outline">
                  {u.displayName} - {u.online ? "online" : "offline"}
                </h2>
                <div className="divider"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default OnlineUsers;
