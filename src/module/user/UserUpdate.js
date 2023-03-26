import UserUpdateForm from "./UserUpdateForm";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useCheckRole } from "../../hooks/useCheckRole";

const UserUpdate = () => {
  const accountRole = useCheckRole();
  const [params] = useSearchParams();
  const userId = params.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    if (!accountRole) {
      navigate("/manage/user");
    }
  }, [accountRole, navigate]);

  useEffect(() => {
    document.title = "Update User";
  }, []);

  return (
    <div>
      <DashboardHeading title="Update user" desc="Update user information" />
      <UserUpdateForm id={userId} role={accountRole} />
    </div>
  );
};

export default UserUpdate;
