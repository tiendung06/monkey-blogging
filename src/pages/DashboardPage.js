import DashboardHeading from "../module/dashboard/DashboardHeading";
import { useEffect } from "react";

const DashboardPage = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <DashboardHeading title="Dashboard" desc="Overview dashboard monitor" />
  );
};

export default DashboardPage;
