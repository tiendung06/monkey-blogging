import { Link } from "react-router-dom";

const Image = ({ className, url, alt }) => {
  return (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      className={`block object-cover w-full h-full rounded-xl ${className}`}
    />
  );
};

const PostImage = ({ className = "", url = "", alt = "", to = "" }) => {
  if (to)
    return (
      <Link to={`/${to}`} className="block">
        <Image url={url} alt={alt} className={className} />
      </Link>
    );
  return <Image url={url} alt={alt} className={className} />;
};

export default PostImage;
