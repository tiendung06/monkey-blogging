import { Link } from "react-router-dom";

const PostCategory = ({
  children,
  type = "primary",
  className = "",
  to = "",
}) => {
  return (
    <div
      type={type}
      className={`${
        type === "secondary" ? "bg-white" : "bg-grayF3"
      } inline-block py-1 px-3 rounded-xl text-gray6B text-xs lg:text-sm font-medium whitespace-nowrap ${className}`}
    >
      <Link to={`/category/${to}`} className="block">
        {children}
      </Link>
    </div>
  );
};

export default PostCategory;
