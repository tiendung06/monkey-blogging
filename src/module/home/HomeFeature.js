import PostFeatureItem from "../post/PostFeatureItem";
import Heading from "../../components/layout/Heading";
import {
  where,
  query,
  onSnapshot,
  limit,
  collection,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(3)
    );

    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, []);

  if (posts.length <= 0) return null;

  return (
    <section className="mb-10 lg:mb-16">
      <div className="spacing">
        <Heading>Featured posts</Heading>
        <div className="grid gap-5 grid-col-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostFeatureItem key={post.id} data={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeature;
