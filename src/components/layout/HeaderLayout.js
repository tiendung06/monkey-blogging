import { NavLink } from "react-router-dom";
import { menuLinks } from "../../utils/nav";

const HeaderLayout = ({ children }) => {
  return (
    <header className="flex items-center py-5">
      <div className="spacing">
        <div className="flex items-center justify-between gap-5">
          <nav className="flex items-center justify-between gap-5 lg:gap-10">
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
          </nav>
          <div className="flex items-center gap-3 lg:gap-5">{children}</div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;
