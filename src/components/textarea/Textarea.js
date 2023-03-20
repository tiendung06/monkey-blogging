import { useController } from "react-hook-form";

const Textarea = ({
  name = "",
  type = "text",
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <div className="relative w-full">
      <textarea
        id={name}
        type={type}
        className="w-full px-5 py-4 text-sm text-black transition-all bg-transparent border rounded-lg resize-none border-grayf1 placeholder:text-[#b2b3bd] min-h-[200px]"
        {...field}
        {...props}
      />
    </div>
  );
};

export default Textarea;
