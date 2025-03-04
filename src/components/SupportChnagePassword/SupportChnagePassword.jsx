import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAfterLoginApi } from "../../redux/slices/chnageSupportSlice";

const ChangeSupportPasswordComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.changeSupportPassword);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    newPassword: Yup.string()
      .min(6, "New password must be at least 6 characters")
      .required("New password is required"),
  });

  const handleSubmit = async (values) => {
    if (loading || isSubmitting) return;
    setIsSubmitting(true);
    try { 
      const response = await dispatch(changePasswordAfterLoginApi(values)).unwrap();
      toast.success(response?.message || "Password changed successfully!");
      setIsSubmitting(false);
    } catch (error) {
      toast.error("Something went wrong");
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", newPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid }) => (
        <Form className="flex flex-col w-full max-md:max-w-full">
          <div className="flex flex-col gap-4 w-full max-md:max-w-full">
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Enter Support Email"
                className="border px-4 py-3 w-full rounded-xl"
              />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                type="password"
                name="newPassword"
                placeholder="Enter New Password"
                className="border px-4 py-3 w-full rounded-xl"
              />
              <ErrorMessage name="newPassword" component="p" className="text-red-500 text-sm mt-1" />
            </div>
          </div>
          <div className="flex flex-col mt-5 w-full max-md:max-w-full">
            <button
              type="submit"
              className="gap-2.5 self-stretch px-40 py-3.5 w-full text-lg font-medium text-white bg-red-400 rounded-xl min-h-[52px] max-md:px-5 max-md:max-w-full"
              disabled={!isValid || loading || isSubmitting}
            >
              {loading || isSubmitting ? "Changing Password..." : "Change Support Password"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangeSupportPasswordComponent;
