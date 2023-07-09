import { Link } from "react-router-dom";

const PostMeta = ({
  date = "22/01/2023",
  authorName = "Do Tien Dung",
  className = "",
  to = "",
}) => {
  return (
    <div
      className={`flex items-center gap-2 text-xs font-medium lg:text-sm text-inherit ${className}`}
    >
      <span>{date}</span>
      <span className="inline-block w-1 h-1 bg-current rounded-full" />
      <Link to={`/author/${to}`} className="block">
        {authorName}
      </Link>
    </div>
  );
};

export default PostMeta;
