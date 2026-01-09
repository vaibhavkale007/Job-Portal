import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);

  // ⏳ wait until redux-persist rehydrates
  if (user === undefined) return null;

  // 🔐 not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 logged in but not recruiter
  if (user.role !== "recruiter") {
    return <Navigate to="/" replace />;
  }

  // ✅ authorized
  return children;
};

export default ProtectedRoute;
