import HeaderLayout from "../../components/layout/HeaderLayout";
import Button from "../../components/button/Button";
import { useAuth } from "../../contexts/auth-context";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  const { userInfo } = useAuth();
  return (
    <HeaderLayout>
      <Button to="/manage/add-post">Write new post</Button>
      <Link to="/profile">
        <img
          src={userInfo?.avatar}
          alt={userInfo?.displayName}
          className="object-cover w-10 h-10 rounded-full lg:w-14 lg:h-14"
        />
      </Link>
    </HeaderLayout>
  );
};

export default DashboardHeader;
