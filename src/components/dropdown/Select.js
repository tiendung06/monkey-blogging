import IconArrow from "../icon/IconArrow";
import { useDropdown } from "./dropdown-context";

const Select = ({ placeholder = "", className = "" }) => {
  const { toggle, show } = useDropdown();
  return (
    <div
      className={`flex items-center justify-between py-4 px-5 bg-white border border-grayf1 rounded-lg cursor-pointer text-sm text-[#B2B3BD] ${className}`}
      onClick={toggle}
    >
      <span>{placeholder}</span>
      <span>
        {show ? (
          <IconArrow />
        ) : (
          <div className="rotate-180">
            <IconArrow />
          </div>
        )}
      </span>
    </div>
  );
};

export default Select;
