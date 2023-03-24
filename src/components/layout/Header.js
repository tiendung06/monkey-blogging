import HeaderLayout from "./HeaderLayout";
import Button from "../button/Button";
import { useAuth } from "../../contexts/auth-context";
import { Link } from "react-router-dom";

const Header = () => {
  const { userInfo } = useAuth();
  return (
    <HeaderLayout>
      {!userInfo ? (
        <Button to="/sign-in">Login</Button>
      ) : (
        <Button to="/dashboard">Dashboard</Button>
      )}
      {userInfo && (
        <Link to="/profile">
          <img
            src={userInfo?.avatar}
            alt={userInfo?.displayName}
            className="object-cover w-10 h-10 rounded-full lg:w-14 lg:h-14"
          />
        </Link>
      )}
    </HeaderLayout>
  );
};

export default Header;
