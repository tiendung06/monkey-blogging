import Textarea from "../../components/textarea/Textarea";
import Heading from "../../components/layout/Heading";
import Button from "../../components/button/Button";
import * as yup from "yup";
import {
  where,
  serverTimestamp,
  query,
  onSnapshot,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";
import { formatDate } from "../../helper";
import { db } from "../../firebase/firebase-config";

const schema = yup.object({
  comment: yup
    .string()
    .min(1, "Please enter your comment")
    .required("Please enter your comment"),
});

const PostComment = ({ id }) => {
  const [listComment, setListComment] = useState([]);
  const { userInfo } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      user: {},
      postId: "",
      comment: "",
    },
  });

  useEffect(() => {
    async function fetchUserData() {
      if (!userInfo.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchUserData();
  }, [setValue, userInfo?.email]);

  useEffect(() => {
    async function fetchData() {
      const colRef = query(
        collection(db, "comments"),
        where("postId", "==", id)
      );
      onSnapshot(colRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setListComment(results);
      });
    }
    fetchData();
  }, [id]);

  const handleCommentPost = async (values) => {
    try {
      if (!isValid) return;
      const cloneValues = { ...values };
      const colRef = collection(db, "comments");
      await addDoc(colRef, {
        ...cloneValues,
        postId: id,
        createdAt: serverTimestamp(),
      });
      toast.success("Comment successfully!");
    } catch (error) {
      toast.error("Comment fail!");
    } finally {
      reset({
        user: {},
        postId: "",
        comment: "",
      });
    }
  };

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  return (
    <div className="mt-5">
      <Heading>Comments</Heading>
      <div>
        {listComment?.map(({ user, id, comment, createdAt }) => {
          return (
            <div className="flex gap-5 mb-5" key={id}>
              <img
                src={user.avatar}
                alt={user.fullName}
                className="object-cover w-10 h-10 rounded-full"
              />
              <div className="flex-1 p-3 text-sm rounded-xl bg-[#f6f6f6]">
                <p className="mb-2 font-medium">{user.fullName}</p>
                <p className="mb-2">{comment}</p>
                <span className="text-xs">{formatDate(createdAt)}</span>
              </div>
            </div>
          );
        })}
      </div>
      {!userInfo && <p className="text-gray-500">Login to comment this post</p>}
      {userInfo && (
        <form onSubmit={handleSubmit(handleCommentPost)}>
          <Textarea
            name="comment"
            placeholder="Leave the comment"
            control={control}
          />
          <Button type="submit" isLoading={isSubmitting}>
            Leave your comment
          </Button>
        </form>
      )}
    </div>
  );
};

export default PostComment;
