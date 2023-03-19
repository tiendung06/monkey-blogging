import Button from "../../components/button/Button";
import { useAuth } from "../../contexts/auth-context";
import { NavLink } from "react-router-dom";

const DashboardHeader = () => {
  const { userInfo } = useAuth();

  return (
    <header className="flex items-center py-5">
      <div className="spacing">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center justify-between gap-5 lg:gap-10">
            <NavLink to="/">
              <img
                srcSet="/logo.png 2x"
                alt="monkey-blogging"
                className="block max-h-[40px] lg:max-h-[56px]"
              />
            </NavLink>
            <p className="hidden font-semibold lg:block text-primary">
              Monkey blogging
            </p>
          </div>
          <div className="flex items-center gap-3 lg:gap-5">
            <Button to="/manage/add-post" className="h-14">
              Write new post
            </Button>
            <img
              src={userInfo?.avatar}
              alt={userInfo?.displayName}
              className="object-cover w-10 h-10 rounded-full lg:w-14 lg:h-14"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
