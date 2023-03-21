import slugify from "slugify";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";
import { formatDate } from "../../helper";

const PostFeatureItem = ({ data }) => {
  if (!data || !data.id) return null;
  const { category, user } = data;

  return (
    <div className="relative w-full h-40 lg:h-64 rounded-2xl">
      <PostImage url={data.image} alt="unsplash" className="lg:h-full" />
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.75)] opacity-60 mix-blend-multiply rounded-2xl"></div>
      <div className="absolute inset-0 z-10 p-3 text-white lg:p-5">
        <div className="flex items-center justify-between mb-4">
          {category?.name && (
            <PostCategory to={category.slug}>{category.name}</PostCategory>
          )}
          <PostMeta
            to={slugify(user?.username || "", { lower: true })}
            authorName={user?.fullName}
            date={formatDate(data)}
          />
        </div>
        <PostTitle to={data.slug} size="big">
          {data.title}
        </PostTitle>
      </div>
    </div>
  );
};

export default PostFeatureItem;
