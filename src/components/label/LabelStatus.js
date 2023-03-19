const LabelStatus = ({ children, type = "default" }) => {
  let styleClassName = "text-gray-500 bg-gray-100";
  switch (type) {
    case "success":
      styleClassName = "text-green-500 bg-green-100";
      break;
    case "warning":
      styleClassName = "text-orange-500 bg-orange-100";
      break;
    case "danger":
      styleClassName = "text-red-500 bg-red-100";
      break;
    default:
      break;
  }

  return (
    <span
      className={`${styleClassName} inline-block px-4 py-3 rounded-md text-sm font-medium`}
    >
      {children}
    </span>
  );
};

export default LabelStatus;
