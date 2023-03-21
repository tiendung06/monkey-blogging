import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";
import { formatDate } from "../../helper";

const PostNewestItem = ({ data }) => {
  if (!data.id) return null;
  console.log(data);
  return (
    <div className="flex items-center gap-5 mb-4 pb-4 lg:mb-7 lg:pb-7 border border-[#ddd] last:p-0 last:m-0 last:border-0">
      <PostImage
        url={data.image}
        alt=""
        to={data.slug}
        className="flex-shrink-0 block h-24 w-36 lg:w-40 lg:h-32 rounded-xl"
      />
      <div className="flex-1">
        <PostCategory type="secondary" className="mb-2" to={data.category.slug}>
          {data.category?.name}
        </PostCategory>
        <PostTitle>{data.title}</PostTitle>
        <PostMeta authorName={data.user.fullName} date={formatDate(data)} />
      </div>
    </div>
  );
};

export default PostNewestItem;
