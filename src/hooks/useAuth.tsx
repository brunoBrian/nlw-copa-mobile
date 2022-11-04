import { useContext } from "react";
import { AuthContext, AuthContextDataProps } from "../context/Auth";


export function useAuth(): AuthContextDataProps {
  const context = useContext(AuthContext)

  return context
}