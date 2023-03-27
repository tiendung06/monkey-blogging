import Table from "../../components/table/Table";
import Swal from "sweetalert2";
import LabelStatus from "../../components/label/LabelStatus";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import { userRole, userStatus } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatDate } from "../../helper";
import { db } from "../../firebase/firebase-config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

const UserTable = ({ accountRole }) => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(results);
    });
  }, []);

  const renderRoleLabel = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Moderator";
      case userRole.USER:
        return "User";
      default:
        break;
    }
  };

  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">Rejected</LabelStatus>;
      default:
        break;
    }
  };

  const handleDeleteUser = async (user) => {
    const colRef = doc(db, "users", user.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        toast.success("Delete user successfully");
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const renderUserItem = (user) => {
    return (
      <tr key={user.id}>
        <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
        <td className="whitespace-nowrap">
          <div className="flex items-center gap-x-3">
            <img
              src={user?.avatar}
              alt=""
              className="flex-shrink-0 object-cover w-10 h-10 rounded-md"
            />
            <div className="flex-1">
              <h3>{user?.fullName}</h3>
              <time className="text-sm text-gray-300">{formatDate(user)}</time>
            </div>
          </div>
        </td>
        <td>{user?.email}</td>
        <td>{renderLabelStatus(Number(user?.status))}</td>
        <td>{renderRoleLabel(Number(user.role))}</td>
        {accountRole && (
          <td>
            <div className="flex items-center text-gray-500 gap-x-3">
              <ActionEdit
                onClick={() => navigate(`/manage/update-user?id=${user.id}`)}
              />
              <ActionDelete onClick={() => handleDeleteUser(user)} />
            </div>
          </td>
        )}
      </tr>
    );
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Info</th>
          <th>Email address</th>
          <th>Status</th>
          <th>Role</th>
          {accountRole && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {userList.length > 0 && userList.map((user) => renderUserItem(user))}
      </tbody>
    </Table>
  );
};

export default UserTable;
