import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import ImageUpload from "../../components/image/ImageUpload";
import Field from "../../components/field/Field";
import DashboardHeading from "../dashboard/DashboardHeading";
import Button from "../../components/button/Button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const UserProfile = () => {
  const { control } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    document.title = "User Profile";
  }, []);

  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      />
      <form>
        <div className="mb-10 text-center">
          <ImageUpload className="!w-[200px] h-[200px] !rounded-full min-h-0 mx-auto" />
        </div>
        <div className="form-layout">
          <Field>
            <Label>Full name</Label>
            <Input
              control={control}
              name="fullName"
              placeholder="Enter your fullName"
            />
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            />
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Date of Birth</Label>
            <Input control={control} name="birthday" placeholder="dd/mm/yyyy" />
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            />
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>New Password</Label>
            <Input
              control={control}
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <Input
              control={control}
              name="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"
            />
          </Field>
        </div>
        <Button kind="primary" className="mx-auto w-[200px]">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
