import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, checkMe } = useAuthStore();
  const [checked, setChecked] = useState(isAuthenticated);

  useEffect(() => {
    // validate token with backend once (prevents stale tokens)
    if (!isAuthenticated) {
      checkMe().then(() => setChecked(true));
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, checkMe]);

  if (!checked) return null; // or a loader

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
};

export default PrivateRoute;
