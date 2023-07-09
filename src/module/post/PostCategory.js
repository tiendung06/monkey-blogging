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
      } inline-block px-3 py-1 text-xs font-medium  rounded-xl text-gray6B lg:text-sm whitespace-nowrap ${className}`}
    >
      <Link to={`/category/${to}`} className="block">
        {children}
      </Link>
    </div>
  );
};

export default PostCategory;
