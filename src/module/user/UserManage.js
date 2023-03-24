import UserTable from "./UserTable";
import DashboardHeading from "../dashboard/DashboardHeading";
import Button from "../../components/button/Button";
import { useEffect } from "react";
import { useCheckRole } from "../../hooks/useCheckRole";

const UserManage = () => {
  const accountRole = useCheckRole();

  useEffect(() => {
    document.title = "User Manage";
  }, []);

  return (
    <div>
      <DashboardHeading title="Users" desc="Manage your user" />
      {accountRole && (
        <div className="flex justify-end mb-10">
          <Button kind="ghost" to="/manage/add-user">
            Add new user
          </Button>
        </div>
      )}
      <UserTable accountRole={accountRole} />
    </div>
  );
};

export default UserManage;
