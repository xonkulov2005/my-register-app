import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useLogout } from "../hooks/useLogout";
function Navbar() {
  const { dispatch, user } = useGlobalContext();
  const { isPending, logout } = useLogout();
  console.log(user.displayName);

  return (
    <header className="bg-base-200">
      <div className="navbar main-container">
        <div className="navbar-start">
          <Link className="btn btn-netural" to="/">
            Logo
          </Link>
        </div>
        <div className="navbar-center">
          <div className="avatar flex items-center gap-4">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img src={user.photoURL} />
            </div>
            <h3 className="text-black">{user.displayName}</h3>
          </div>
        </div>
        <div className="navbar-end">
          {!isPending && (
            <button onClick={logout} className="btn btn-secondary btn-outline">
              Logout
            </button>
          )}
          {isPending && (
            <button
              onClick={logout}
              className="btn btn-secondary btn-outline"
              disabled
            >
              Logout...
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
