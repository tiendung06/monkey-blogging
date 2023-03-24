import PostItem from "./PostItem";
import Heading from "../../components/layout/Heading";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const PostRelated = ({ categoryId = "" }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("category.id", "==", categoryId)
    );
    onSnapshot(docRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, [categoryId]);
  if (!categoryId || posts.length <= 0) return null;
  return (
    <div className="mb-10 lg:mb-16">
      <Heading>Bài viết liên quan</Heading>
      <div className="grid gap-5 grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((item) => (
          <PostItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default PostRelated;
