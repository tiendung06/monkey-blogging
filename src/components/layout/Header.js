import Button from "../button/Button";
import { useAuth } from "../../contexts/auth-context";

import { NavLink } from "react-router-dom";

const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
];

const Header = () => {
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
            <ul className="flex items-center h-full gap-5 font-medium list-none">
              {menuLinks.map((item) => (
                <li className="h-full" key={item.title}>
                  <NavLink
                    to={item.url}
                    className="transition-all hover:text-primary"
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-3 lg:gap-5">
            {!userInfo ? (
              <Button type="button" className="block" to="/sign-in">
                Login
              </Button>
            ) : (
              <Button type="button" className="block" to="/dashboard">
                Dashboard
              </Button>
            )}
            {userInfo && (
              <img
                src={userInfo?.avatar}
                alt={userInfo?.displayName}
                className="object-cover w-10 h-10 rounded-full lg:w-14 lg:h-14"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
