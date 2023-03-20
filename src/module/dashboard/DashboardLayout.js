import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import { useEffect } from "react";
import { useAuth } from "../../contexts/auth-context";
import { Outlet, useNavigate } from "react-router-dom";

const DashBoardLayout = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/sign-in");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex flex-col w-full min-h-screen mx-auto">
      <DashboardHeader />
      <div className="flex flex-col items-start flex-1 h-full gap-10 pb-10 lg:flex-row lg:py-10 spacing">
        <Sidebar />
        <div className="flex-1 w-full">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
