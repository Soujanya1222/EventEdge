import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchAccount } from "../slices/userSlice";

export default function PrivateRoute({ children, allowedRoles }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { data: user, isAuthenticated, isloading } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchAccount());
    }
  }, [token, user]);

  if (!token) return <Navigate to="/login" replace />;

  if (isloading || (token && !user)) return <p>Loading...</p>;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <h2>Unauthorized</h2>;
  }

  return children;
}
