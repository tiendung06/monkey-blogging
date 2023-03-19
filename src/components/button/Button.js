import LoadingSpinner from "../loading/LoadingSpinner";
import { NavLink } from "react-router-dom";

const Button = ({
  type = "button",
  className,
  onClick = () => {},
  children,
  kind = "primary",
  isLoading,
  to,
  ...props
}) => {
  const child = !!isLoading ? <LoadingSpinner /> : children;

  let defaultClassName =
    " flex items-center justify-center h-12 lg:h-14 px-6 font-semibold rounded-lg cursor-pointer " +
    className;
  switch (kind) {
    case "primary":
      defaultClassName = "text-white bg-primary" + defaultClassName;
      break;
    case "secondary":
      defaultClassName = "text-white bg-secondary" + defaultClassName;
      break;
    case "ghost":
      defaultClassName =
        "text-primary bg-[rgba(29,192,113,0.1)]" + defaultClassName;
      break;
    default:
      defaultClassName = "text-white bg-primary" + defaultClassName;
      break;
  }

  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to} className="inline-block">
        <button type={type} {...props} className={defaultClassName}>
          {child}
        </button>
      </NavLink>
    );
  }

  return (
    <button
      type={type}
      className={`${defaultClassName} ${
        isLoading && "opacity-50 pointer-events-none"
      }`}
      onClick={onClick}
      {...props}
    >
      {child}
    </button>
  );
};

export default Button;
