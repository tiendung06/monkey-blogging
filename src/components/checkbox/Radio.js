import IconCheck from "../icon/IconCheck";
import { useController } from "react-hook-form";

const Radio = ({ checked, children, control, name, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <label>
      <input
        checked={checked}
        type="radio"
        className="hidden-input"
        {...field}
        {...rest}
      />
      <div className="flex items-center font-medium cursor-pointer gap-x-3">
        <div
          className={`w-7 h-7 rounded-full border flex items-center justify-center p-1 ${
            checked
              ? "bg-primary border-primary text-white"
              : "border-gray-200 text-transparent"
          }`}
        >
          <IconCheck />
        </div>
        <span>{children}</span>
      </div>
    </label>
  );
};

export default Radio;
