import React, { useEffect, useState } from "react";
import PostItem from "../module/post/PostItem";
import Layout from "../components/layout/Layout";
import Heading from "../components/layout/Heading";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const CategoryPage = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("category.slug", "==", params.slug)
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
    }
    fetchData();
  }, [params.slug]);

  useEffect(() => {
    document.title = "Category";
  }, []);

  if (posts.length <= 0) return null;

  return (
    <Layout>
      <div className="spacing">
        <div className="pt-10"></div>
        <Heading>Category {params.slug}</Heading>
        <div className="grid-layout grid-layout--primary">
          {posts.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;