import { Link } from "react-router-dom";

const PostTitle = ({ children, className = "", size = "normal", to = "" }) => {
  return (
    <h3
      className={`${
        size === "big" ? "lg:text-2xl text-xl" : "lg:text-lg text-base"
      } font-semibold leading-normal ${className}`}
    >
      <Link to={`/${to}`}>{children}</Link>
    </h3>
  );
};

export default PostTitle;
