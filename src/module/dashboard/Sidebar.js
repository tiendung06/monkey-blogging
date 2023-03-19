import IconUser from "../../components/icon/IconUser";
import IconPost from "../../components/icon/IconPost";
import IconLogout from "../../components/icon/IconLogout";
import IconDashboard from "../../components/icon/IconDashboard";
import IconCategory from "../../components/icon/IconCategory";
import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";

const sidebarLinks = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <IconDashboard />,
  },
  {
    title: "Post",
    url: "/manage/posts",
    icon: <IconPost />,
  },
  {
    title: "Category",
    url: "/manage/category",
    icon: <IconCategory />,
  },
  {
    title: "User",
    url: "/manage/user",
    icon: <IconUser />,
  },
  {
    title: "Logout",
    url: "/",
    icon: <IconLogout />,
    onClick: () => signOut(auth),
  },
];

const Sidebar = () => {
  return (
    <div className="flex gap-8 flex-row justify-between min-w-full p-3 lg:min-w-0 lg:flex-col lg:px-4 lg:py-10 bg-white h-full rounded-xl shadow-[10px_10px_20px_rgba(218,213,213,0.15)]">
      {sidebarLinks.map((link) => {
        if (link.onClick)
          return (
            <div
              onClick={link.onClick}
              key={link.title}
              className="flex items-center justify-center w-12 h-12 gap-5 font-medium transition-all cursor-pointer text-gray80 hover:text-red-500"
            >
              <span title={link.title}>{link.icon}</span>
            </div>
          );
        return (
          <NavLink
            to={link.url}
            className={({ isActive }) =>
              isActive
                ? "text-primary bg-[#F1FBF7] block rounded-xl"
                : "text-gray80"
            }
            key={link.title}
          >
            <span
              className="flex items-center justify-center w-12 h-12 font-medium transition-all cursor-pointer hover:text-primary"
              title={link.title}
            >
              {link.icon}
            </span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;
