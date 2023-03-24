import Table from "../../components/table/Table";
import Swal from "sweetalert2";
import LabelStatus from "../../components/label/LabelStatus";
import ActionView from "../../components/action/ActionView";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import { useNavigate } from "react-router-dom";
import { postStatus } from "../../utils/constants";
import { formatDate } from "../../helper";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const PostTable = ({ post }) => {
  const navigate = useNavigate();

  const renderPostStatus = (status) => {
    switch (status) {
      case postStatus.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case postStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case postStatus.REJECTED:
        return <LabelStatus type="danger">Rejected</LabelStatus>;
      default:
        break;
    }
  };

  async function handleDeletePost(postId) {
    const docRef = doc(db, "posts", postId);
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
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    });
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Post</th>
          <th>Category</th>
          <th>Author</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {post.length > 0 &&
          post.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.id?.slice(0, 5) + "..."}</td>
                <td className="!pr-[100px]">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover w-20 rounded h-11"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <h3 className="max-w-xs font-semibold truncate">
                        {post.title}
                      </h3>
                      <time className="text-sm text-gray-500">
                        Date: {formatDate(post)}
                      </time>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-gray-500">{post.category?.name}</span>
                </td>
                <td>
                  <span className="text-gray-500">{post.user?.username}</span>
                </td>
                <td>{renderPostStatus(post.status)}</td>
                <td>
                  <div className="flex items-center text-gray-500 gap-x-3">
                    <ActionView onClick={() => navigate(`/${post.slug}`)} />
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-post?id=${post.id}`)
                      }
                    />
                    <ActionDelete onClick={() => handleDeletePost(post.id)} />
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default PostTable;
