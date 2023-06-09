import useFirebaseImage from "../../hooks/useFirebaseImage";
import Textarea from "../../components/textarea/Textarea";
import Radio from "../../components/checkbox/Radio";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import ImageUpload from "../../components/image/ImageUpload";
import FieldCheckboxes from "../../components/field/FieldCheckboxes";
import Field from "../../components/field/Field";
import DashboardHeading from "../dashboard/DashboardHeading";
import Button from "../../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRole, userStatus } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useCheckRole } from "../../hooks/useCheckRole";
import { toast } from "react-toastify";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/firebase-config";

const schema = yup.object({
  fullName: yup.string().required("Please enter full name"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter email address"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters or greater")
    .required("Please enter password"),
});

const UserAddNew = () => {
  const accountRole = useCheckRole();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { isValid, isSubmitting, errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      avatar: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: new Date(),
    },
  });

  const {
    image,
    handleResetUpload,
    progress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);

  const handleCreateUser = async (values) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(auth.currentUser, {
        displayName: values.fullName,
        photoURL:
          image ||
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      });

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        avatar:
          image ||
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: serverTimestamp(),
      });
      toast.success(
        `Create new user with email: ${values.email} successfully!`
      );
      reset({
        fullName: "",
        email: "",
        password: "",
        description: "",
        avatar: "",
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: new Date(),
      });
      handleResetUpload();
    } catch (error) {
      if (error.message.includes("email-already-in-use")) {
        toast.error("Email already in use");
      } else {
        toast.error("Create user fail!");
      }
    }
  };

  const watchStatus = watch("status");
  const watchRole = watch("role");

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  useEffect(() => {
    if (!accountRole) {
      navigate("/manage/user");
    }
  }, [accountRole, navigate]);

  useEffect(() => {
    document.title = "Add New User";
  }, []);

  return (
    <div>
      <DashboardHeading title="New user" desc="Add new user to system" />
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className="mx-auto mb-10 rounded-full w-52 h-52">
          <ImageUpload
            className="!rounded-full h-full"
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            image={image}
          />
        </div>
        <div className="form-layout">
          <Field>
            <Label>Full name</Label>
            <Input
              name="fullName"
              placeholder="Enter your full name"
              control={control}
            />
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            />
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Description</Label>
            <Textarea
              name="description"
              control={control}
              placeholder="Describe yourself here"
            />
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            />
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
