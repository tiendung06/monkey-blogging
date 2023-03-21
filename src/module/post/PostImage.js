import { Link } from "react-router-dom";

const PostImage = ({ className = "", url = "", alt = "", to = "" }) => {
  if (to)
    return (
      <Link to={`/${to}`} className="block">
        <div className={`h-52 mb-5 block w-full rounded-xl ${className}`}>
          <img
            src={url}
            alt={alt}
            loading="lazy"
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
      </Link>
    );
  return (
    <div className={`h-52 mb-5 block w-full rounded-xl ${className}`}>
      <img
        src={url}
        alt={alt}
        loading="lazy"
        className="object-cover w-full h-full rounded-xl"
      />
    </div>
  );
};

export default PostImage;
