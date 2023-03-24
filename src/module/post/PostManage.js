import PostTable from "./PostTable";
import DashboardHeading from "../dashboard/DashboardHeading";
import Button from "../../components/button/Button";
import {
  where,
  startAfter,
  query,
  onSnapshot,
  limit,
  getDocs,
  collection,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCheckRole } from "../../hooks/useCheckRole";
import { useAuth } from "../../contexts/auth-context";
import { debounce } from "lodash";
import { db } from "../../firebase/firebase-config";

const POST_PER_PAGE = 10;

const PostManage = () => {
  const [postList, setPostList] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const { userInfo } = useAuth();
  const accountRole = useCheckRole();

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newRef, (snapshot) => {
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
  }, [filter]);

  const handleSearchPost = debounce((e) => {
    setFilter(e.target.value);
  }, 250);

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

  useEffect(() => {
    document.title = "Post Manage";
  }, []);

  const filterPostList = postList.filter(
    (post) => post.user.email === userInfo.email
  );

  return (
    <div>
      <DashboardHeading title="All posts" desc="Manage all posts" />
      <div className="flex justify-end gap-5 mb-10">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg"
            placeholder="Search post..."
            onChange={handleSearchPost}
          />
        </div>
      </div>
      {accountRole ? (
        <PostTable post={postList} />
      ) : (
        <PostTable post={filterPostList} />
      )}
      {total > postList.length && (
        <div className="mt-10 text-center">
          <Button className="mx-auto w-[200px]" onClick={handleLoadMorePost}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostManage;
