import Input from "./Input";
import IconEyeOpen from "../icon/IconEyeOpen";
import IconEyeClose from "../icon/IconEyeClose";
import { Fragment, useState } from "react";

const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;

  return (
    <Fragment>
      <Input
        type={togglePassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        control={control}
      >
        {!togglePassword ? (
          <IconEyeClose
            className="text-[#84878b]"
            onClick={() => setTogglePassword(true)}
          />
        ) : (
          <IconEyeOpen
            className="text-[#84878b]"
            onClick={() => setTogglePassword(false)}
          />
        )}
      </Input>
    </Fragment>
  );
};

export default InputPasswordToggle;
