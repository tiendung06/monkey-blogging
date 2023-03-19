const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium cursor-pointer text-gray4b"
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
