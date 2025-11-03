import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"

export const PrivateRoute = ({ children }: { children: any }) => {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
