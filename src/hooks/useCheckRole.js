import { useAuth } from "../contexts/auth-context";
import { userRole } from "../utils/constants";

export const useCheckRole = () => {
  const { userInfo } = useAuth();
  const accountRole = userInfo?.role === (userRole.ADMIN || userRole.MOD);
  return accountRole;
};
