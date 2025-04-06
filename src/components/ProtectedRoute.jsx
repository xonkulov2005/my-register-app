import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  if (user) {
    return children;
  } else {
    return <Navigate to="/register" />;
  }
}

export default ProtectedRoute;
