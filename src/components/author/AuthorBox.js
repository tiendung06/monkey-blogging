import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <div className="p-5 mt-10 bg-grayF3 rounded-3xl">
      <div className="flex items-center gap-5 mb-5">
        <div className="w-16 h-16">
          <img
            src={user?.avatar}
            alt={user?.fullName}
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div>
          <h3 className="text-base font-semibold">{user?.fullName}</h3>
          <Link to={`/author/${user?.username}`} className="block">
            <p className="text-sm text-gray4b">{user?.username}</p>
          </Link>
        </div>
      </div>
      <p>{user?.description}</p>
    </div>
  );
};

export default AuthorBox;
