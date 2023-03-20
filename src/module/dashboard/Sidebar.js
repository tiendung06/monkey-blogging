import IconUser from "../../components/icon/IconUser";
import IconPost from "../../components/icon/IconPost";
import IconLogout from "../../components/icon/IconLogout";
import IconDashboard from "../../components/icon/IconDashboard";
import IconCategory from "../../components/icon/IconCategory";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
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
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Sign out success!");
        navigate("/");
      })
      .catch(() => toast.error("Sign out fail!"));
  };

  return (
    <div className="flex justify-between gap-8 flex-row min-w-full text-gray80 p-3 lg:min-w-0 lg:flex-col lg:px-4 lg:py-10 bg-white h-full rounded-xl shadow-[10px_10px_20px_rgba(218,213,213,0.15)]">
      {sidebarLinks.map((link) => {
        return (
          <NavLink
            key={link.title}
            to={link.url}
            className={({ isActive }) =>
              isActive ? "text-primary bg-[#F1FBF7] block rounded-xl" : ""
            }
          >
            <LinkItem title={link.title}>{link.icon}</LinkItem>
          </NavLink>
        );
      })}
      <LinkItem
        title="Log out"
        className="hover:text-red-500"
        onClick={handleSignOut}
      >
        <IconLogout />
      </LinkItem>
    </div>
  );
};

const LinkItem = ({ children, title, className, ...props }) => {
  return (
    <span
      title={title}
      className={`${className} block w-12 h-12 font-medium transition-all cursor-pointer center hover:text-primary`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Sidebar;
