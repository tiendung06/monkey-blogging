import IconTrash from "../icon/IconTrash";

const ActionDelete = ({ onClick = () => {} }) => {
  return (
    <span
      className="flex items-center justify-center w-10 h-10 transition-all border rounded cursor-pointer hover:text-red-500 hover:border-red-500"
      onClick={onClick}
    >
      <IconTrash />
    </span>
  );
};

export default ActionDelete;
