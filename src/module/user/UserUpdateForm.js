import useFirebaseImage from "../../hooks/useFirebaseImage";
import Textarea from "../../components/textarea/Textarea";
import Radio from "../../components/checkbox/Radio";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import ImageUpload from "../../components/image/ImageUpload";
import FieldCheckboxes from "../../components/field/FieldCheckboxes";
import Field from "../../components/field/Field";
import Button from "../../components/button/Button";
import { userRole, userStatus } from "../../utils/constants";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const UserUpdateForm = ({ id, role = false }) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onSubmit",
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";

  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);

  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    try {
      const colRef = doc(db, "users", id);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });
      toast.success("Update user information successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Update user failed!");
    }
  };

  async function deleteAvatar() {
    const colRef = doc(db, "users", id);
    await updateDoc(colRef, {
      avatar: "",
    });
  }

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      const colRef = doc(db, "users", id);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
    }
    fetchData();
  }, [id, reset]);

  if (!id) return null;

  return (
    <form onSubmit={handleSubmit(handleUpdateUser)}>
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
          <Label>Full Name</Label>
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
            disabled={true}
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
      <div className={`form-layout ${!role ? "!hidden" : ""}`}>
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
        Update
      </Button>
    </form>
  );
};

export default UserUpdateForm;
