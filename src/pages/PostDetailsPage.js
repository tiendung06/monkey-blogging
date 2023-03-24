import PostRelated from "../module/post/PostRelated";
import PostMeta from "../module/post/PostMeta";
import PostImage from "../module/post/PostImage";
import PostCategory from "../module/post/PostCategory";
import PageNotFound from "./PageNotFound";
import Layout from "../components/layout/Layout";
import Button from "../components/button/Button";
import AuthorBox from "../components/author/AuthorBox";
import { userRole } from "../utils/constants";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth-context";
import { formatDate } from "../helper";
import { db } from "../firebase/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() &&
            setPostInfo({
              id: doc.id,
              ...doc.data(),
            });
        });
      });
    }
    fetchData();
  }, [slug]);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);

  useEffect(() => {
    document.title = postInfo.title || "Monkey Blogging";
  }, [postInfo.title]);

  const { userInfo } = useAuth();
  const { user } = postInfo;

  if (!slug) return <PageNotFound />;
  if (!postInfo.title) return null;

  return (
    <Layout>
      <div className="spacing">
        <div className="flex flex-col-reverse items-center justify-between gap-x-10 lg:flex-row">
          <PostImage url={postInfo.image} className="max-w-2xl mb-0 lg:h-96" />
          <div className="flex-1 w-full mb-5">
            <PostCategory className="mb-3 lg:mb-5" to={postInfo.category?.slug}>
              {postInfo.category?.name}
            </PostCategory>
            <h1 className="mb-3 text-2xl font-bold !leading-normal lg:text-3xl">
              {postInfo.title}
            </h1>
            <PostMeta authorName={user.fullName} date={formatDate(postInfo)} />
            {userInfo?.role === (userRole.ADMIN || userRole.MOD) && (
              <Button
                kind="ghost"
                to={`/manage/update-post?id=${postInfo.id}`}
                className="mt-5"
              >
                Edit post
              </Button>
            )}
          </div>
        </div>
        <div className="max-w-3xl mx-auto my-10">
          <div
            className="entry-content"
            dangerouslySetInnerHTML={{
              __html: postInfo.content || "",
            }}
          ></div>
          <AuthorBox userId={user.id} />
        </div>
        <PostRelated categoryId={postInfo?.category?.id} />
      </div>
    </Layout>
  );
};

export default PostDetailsPage;
