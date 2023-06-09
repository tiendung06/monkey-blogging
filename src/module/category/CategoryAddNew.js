import slugify from "slugify";
import Radio from "../../components/checkbox/Radio";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import FieldCheckboxes from "../../components/field/FieldCheckboxes";
import Field from "../../components/field/Field";
import DashboardHeading from "../../module/dashboard/DashboardHeading";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useCheckRole } from "../../hooks/useCheckRole";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase-config";
import { categoryStatus } from "../../utils/constants";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const CategoryAddNew = () => {
  const accountRole = useCheckRole();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });

  const handleAddNewCategory = async (values) => {
    if (!isValid) return;
    const newValues = { ...values };
    newValues.slug = slugify(newValues.name || newValues.slug, {
      lower: true,
    });
    newValues.status = Number(newValues.status);
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...newValues,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new category successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        createdAt: new Date(),
      });
    }
  };

  const watchStatus = watch("status");

  useEffect(() => {
    if (!accountRole) navigate("/manage/category");
  }, [accountRole, navigate]);

  useEffect(() => {
    document.title = "Tạo danh mục";
  }, []);

  return (
    <div>
      <DashboardHeading title="New category" desc="Add new category" />
      <form onSubmit={handleSubmit(handleAddNewCategory)} autoComplete="off">
        <div className="form-layout">
          <Field>
            <Label>Tên danh mục</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            />
          </Field>
          <Field>
            <Label>Đường dẫn</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            />
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Trạng thái</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Chấp thuận
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Không chấp thuận
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[200px]"
          kind="primary"
          isLoading={isSubmitting}
        >
          Thêm danh mục
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
