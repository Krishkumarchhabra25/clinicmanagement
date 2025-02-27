import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePasswordBeforeLogin, resetChangePasswordState } from "../../redux/slices/changePassword";
import { toast } from "react-hot-toast";


const ResetPasswordComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success } = useSelector((state) => state.changePassword);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added local submission state

  // Redirect to login page if password change is successful
  useEffect(() => {
    let timeoutId;
    if (success) {
      timeoutId = setTimeout(() => {
        dispatch(resetChangePasswordState());
        navigate("/login");
      }, 2000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      dispatch(resetChangePasswordState());
    };
  }, [success, dispatch, navigate]);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    lastPassword: Yup.string()
      .min(6, "Last password must be at least 6 characters")
      .required("Last password is required"),
    newPassword: Yup.string()
      .min(6, "New password must be at least 6 characters")
      .required("New password is required"),
  });

  // Handle Submit with double-click protection
  const handleSubmit = async (values) => {
    if (loading || isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
    try {
      await dispatch(changePasswordBeforeLogin(values));
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", lastPassword: "", newPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <Form className="flex flex-col w-full max-md:max-w-full">
            <div className="flex flex-col gap-4 w-full max-md:max-w-full">
              {/* Email Field */}
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  className="border px-4 py-3 w-full rounded-xl"
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Last Password Field */}
              <div>
                <Field
                  type="password"
                  name="lastPassword"
                  placeholder="Enter Last Password"
                  className="border px-4 py-3 w-full rounded-xl"
                />
                <ErrorMessage name="lastPassword" component="p" className="text-red-500 text-sm mt-1" />
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
              {/* Submit Button with enhanced disabled state */}
              <button
                type="submit"
                className="gap-2.5 self-stretch px-40 py-3.5 w-full text-lg font-medium text-white bg-red-400 rounded-xl min-h-[52px] max-md:px-5 max-md:max-w-full"
                disabled={!isValid || loading || isSubmitting} // Combined disabled conditions
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

export default ResetPasswordComponent;