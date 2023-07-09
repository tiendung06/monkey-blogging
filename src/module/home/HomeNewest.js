import PostNewestLarge from "../../module/post/PostNewestLarge";
import PostNewestItem from "../../module/post/PostNewestItem";
import Heading from "../../components/layout/Heading";
import {
  where,
  query,
  onSnapshot,
  limit,
  collection,
} from "firebase/firestore";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";

const HomeNewest = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", false),
      limit(4)
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
  const [first, ...other] = posts;

  return (
    <section className="mb-10 lg:mb-16">
      <div className="spacing">
        <Heading>Latest posts</Heading>
        <div className="grid items-start grid-cols-1 gap-10 gap-y-10 lg:grid-cols-2">
          <PostNewestLarge data={first} />
          <div>
            {other.length > 0 &&
              other.map((item) => <PostNewestItem key={v4()} data={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeNewest;
