import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  role
}: {
  children: React.ReactNode;
  role?: "admin" | "candidate";
}) {
  const user = useSelector((s: any) => s.auth.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
