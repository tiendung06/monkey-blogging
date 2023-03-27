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

  if (!userId) return null;

  return (
    <div className="p-5 mt-10 bg-grayF3 rounded-3xl">
      <div className="flex items-center gap-5 mb-5">
        <div className="w-16 h-16">
          <img
            src={user?.avatar}
            alt={user?.fullName}
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <h3 className="text-base font-semibold">{user?.fullName}</h3>
      </div>
      <p>{user?.description}</p>
    </div>
  );
};

export default AuthorBox;
