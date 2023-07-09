import { useController } from "react-hook-form";

const Textarea = ({
  name = "",
  type = "text",
  children,
  control,
  placeholder,
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
        placeholder={placeholder}
        className="w-full px-5 py-4 text-sm text-black transition-all border rounded-lg resize-none leading-normal border-transparent focus:bg-white focus:border-primary bg-grayLight placeholder:text-[#84878b] min-h-[150px]"
        {...field}
        {...props}
      />
    </div>
  );
};

export default Textarea;
