import { Link } from "react-router-dom";

const PostMeta = ({
  date = "Mar 23",
  authorName = "Andiez Le",
  className = "",
  to = "",
}) => {
  return (
    <div
      className={`flex items-center gap-2 text-xs font-semibold lg:gap-3 lg:text-sm text-inherit ${className}`}
    >
      <span className="post-time">{date}</span>
      <span className="inline-block w-1 h-1 bg-current rounded-full"></span>

      <Link to={`/author/${to}`}>
        <span className="post-author">{authorName}</span>
      </Link>
    </div>
  );
};

export default PostMeta;
