import { useController } from "react-hook-form";

const Input = ({ name = "", type = "text", children, control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <div className="relative w-full">
      <input
        id={name}
        type={type}
        className={`${
          children ? "pr-14" : ""
        } w-full px-5 py-4 rounded-lg text-sm bg-grayLight placeholder:text-[#84878b] font-medium transition-all border border-transparent focus:bg-white focus:border-primary`}
        {...field}
        {...props}
      />
      {children ? (
        <div className="absolute -translate-y-1/2 cursor-pointer right-5 top-1/2">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
