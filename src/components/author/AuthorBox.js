import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const AuthorBox = ({ userId = "" }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      const docRef = doc(db, "users", userId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        setUser(docSnapshot.data());
      }
    }
    fetchUserData();
  }, [userId]);

  if (!userId || !user.username) return null;

  return (
    <div className="flex mt-10 mb-20 rounded-3xl bg-grayF3">
      <div className="w-52 h-52 shrink-0 rounded-3xl">
        <img
          src={user?.avatar}
          alt=""
          className="object-cover w-full h-full rounded-3xl"
        />
      </div>
      <div className="flex-1 p-5">
        <h3 className="mb-3 text-xl font-bold">{user?.fullName}</h3>
        <p className="text-sm leading-loose">{user?.description}</p>
      </div>
    </div>
  );
};

export default AuthorBox;
