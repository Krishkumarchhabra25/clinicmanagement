import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { changePasswordAfterLogin, resetChangePasswordState } from "../../redux/slices/changePassword";
import { toast } from "react-hot-toast";

const ResetPasswordAfterLoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.changePassword);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show toast messages on success or error
  useEffect(() => {
    if (success) {
      toast.success("Password changed successfully! Logging out...");
      setTimeout(() => {
        dispatch(resetChangePasswordState());
        navigate("/login"); // Redirect to login
      }, 2000);
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch, navigate]);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(6, "Current password must be at least 6 characters")
      .required("Current password is required"),
    newPassword: Yup.string()
      .min(6, "New password must be at least 6 characters")
      .required("New password is required"),
  });

  // Handle Submit
  const handleSubmit = async (values) => {
    if (loading || isSubmitting) return;
    setIsSubmitting(true);

     try {
          const response = dispatch(changePasswordAfterLogin(values)); // Unwrap to get response
          if (response.success) {
            toast.success("Password changed successfully!");
            navigate("/")
          } else {
            toast.error(response.message || "Something went wrong!");
          }
        } catch (error) {
          toast.error(error?.message || "An error occurred. Please try again.");
        } finally {
          setIsSubmitting(false); // Reset submission state
        }
  
  };

  return (
    <>
      <Formik
        initialValues={{ currentPassword: "", newPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <Form className="flex flex-col w-full max-md:max-w-full">
            <div className="flex flex-col gap-4 w-full max-md:max-w-full">
              {/* Current Password Field */}
              <div>
                <Field
                  type="password"
                  name="currentPassword"
                  placeholder="Enter Current Password"
                  className="border px-4 py-3 w-full rounded-xl"
                />
                <ErrorMessage name="currentPassword" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* New Password Field */}
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
              {/* Submit Button */}
              <button
                type="submit"
                className="gap-2.5 self-stretch px-40 py-3.5 w-full text-lg font-medium text-white bg-red-400 rounded-xl min-h-[52px] max-md:px-5 max-md:max-w-full"
                disabled={!isValid || loading || isSubmitting}
              >
                {loading || isSubmitting ? "Changing Password..." : "Change Password"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordAfterLoginComponent;
