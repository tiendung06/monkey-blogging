import IconPen from "../icon/IconPen";

const ActionEdit = ({ onClick = () => {} }) => {
  return (
    <span
      className="flex items-center justify-center w-10 h-10 transition-all border rounded cursor-pointer hover:text-orange-500 hover:border-orange-500"
      onClick={onClick}
    >
      <IconPen />
    </span>
  );
};

export default ActionEdit;
