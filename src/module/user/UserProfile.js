import UserUpdateForm from "./UserUpdateForm";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useEffect } from "react";
import { useAuth } from "../../contexts/auth-context";

const UserProfile = () => {
  const { userInfo } = useAuth();

  useEffect(() => {
    document.title = "User Profile";
  }, []);

  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      />
      <UserUpdateForm id={userInfo.uid} />
    </div>
  );
};

export default UserProfile;
