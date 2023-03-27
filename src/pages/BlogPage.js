import PostItem from "../module/post/PostItem";
import Layout from "../components/layout/Layout";
import Heading from "../components/layout/Heading";
import Button from "../components/button/Button";
import { useState } from "react";
import { useEffect } from "react";
import {
  startAfter,
  query,
  orderBy,
  onSnapshot,
  limit,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const POST_PER_PAGE = 20;

const BlogPage = () => {
  const [postList, setPostList] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    document.title = "Blog";
  }, []);

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const docRef = query(
        colRef,
        orderBy("createdAt", "desc"),
        limit(POST_PER_PAGE)
      );
      const documentSnapshots = await getDocs(docRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(docRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, []);

  const handleLoadMorePost = async () => {
    const nextRef = query(
      collection(db, "posts"),
      startAfter(lastDoc || 0),
      limit(POST_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList([...postList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };

  return (
    <Layout>
      <div className="spacing">
        <div className="my-5">
          <Heading>Blog</Heading>
          <div className="grid gap-5 grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {postList.map((item) => (
              <PostItem key={item.id} data={item} />
            ))}
          </div>
          {total > postList.length && (
            <div className="mt-10 text-center">
              <Button
                className="mx-auto w-[200px]"
                onClick={handleLoadMorePost}
              >
                Load more
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
