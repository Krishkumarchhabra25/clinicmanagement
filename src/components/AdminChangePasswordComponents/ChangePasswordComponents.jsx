import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendOtp, resetOtpState } from "../../redux/slices/SendotpSlice";
import { verifyOtp, resetVerification } from "../../redux/slices/verifyOtp";

const ChangePasswordComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux States
  const { loading: otpLoading, message: otpMessage, error: otpError } = useSelector((state) => state.sendotp);
  const { verifying, verified, message: verifyMessage, error: verifyError } = useSelector((state) => state.verifyOtp);
  
  // Local States
  const [timer, setTimer] = useState(0);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(resetVerification());
      dispatch(resetOtpState());
    };
  }, [dispatch]);

  // Countdown Timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle Success/Error messages
  useEffect(() => {
    if (otpMessage) {
      toast.success(otpMessage);
      dispatch(resetOtpState());
    }
    if (otpError) {
      toast.error(otpError);
      dispatch(resetOtpState());
    }
    if (verifyMessage) {
      toast.success(verifyMessage);
      dispatch(resetVerification());
      navigate("/resetpassword");
    }
    if (verifyError) {
      toast.error(verifyError);
      dispatch(resetVerification());
    }
  }, [otpMessage, otpError, verifyMessage, verifyError, dispatch, navigate]);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    otp: isOtpSent ? Yup.string()
      .matches(/^\d{6}$/, "OTP must be 6 digits")
      .required("OTP is required") : Yup.string(),
  });

  // Send OTP Handler
  const handleSendOtp = async (values) => {
    if (otpLoading || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await dispatch(sendOtp(values.email));
      setTimer(120);
      setIsOtpSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Verify OTP Handler
  const handleVerifyOtp = async (values) => {
    if (verifying) return;
    dispatch(verifyOtp({ email: values.email, otp: values.otp }));
  };

  return (
    <Formik
      initialValues={{ email: "", otp: "" }}
      validationSchema={validationSchema}
      onSubmit={handleVerifyOtp}
    >
      {({ values }) => (
        <Form className="flex flex-col mt-10 w-full max-md:max-w-full">
          <div className="flex flex-col gap-4 w-full max-md:max-w-full">
            {/* Email Field */}
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Enter your Email"
                className="border px-4 py-3 w-full rounded-xl"
                disabled={isOtpSent}
              />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* OTP Field */}
            {isOtpSent && (
              <div>
                <Field
                  type="text"
                  name="otp"
                  placeholder="Enter your OTP"
                  className="border px-4 py-3 w-full rounded-xl"
                  maxLength={6}
                />
                <ErrorMessage name="otp" component="p" className="text-red-500 text-sm mt-1" />
                {timer > 0 ? (
                  <p className="text-gray-600 text-sm mt-1">Time left: {timer}s</p>
                ) : (
                  <p className="text-red-500 text-sm mt-1">OTP expired. Please resend.</p>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col mt-5 w-full max-md:max-w-full">
            {/* Send OTP Button */}
            {!isOtpSent && (
              <button
                type="button"
                onClick={() => handleSendOtp(values)}
                className="gap-2.5 self-stretch px-56 py-3.5 w-full text-lg font-medium text-white bg-orange-400 rounded-xl"
                disabled={otpLoading || isSubmitting}
              >
                {otpLoading || isSubmitting ? "Sending..." : "Send OTP"}
              </button>
            )}

            {/* Resend OTP Button */}
            {(isOtpSent && timer === 0) && (
              <button
                type="button"
                onClick={() => handleSendOtp(values)}
                className="mt-3 px-56 py-3.5 w-full text-lg font-medium text-white bg-orange-400 rounded-xl"
                disabled={otpLoading || isSubmitting}
              >
                {isSubmitting ? "Resending..." : "Resend OTP"}
              </button>
            )}

            {/* Verify OTP Button */}
            {isOtpSent && values.otp.length === 6 && (
              <button
                type="submit"
                className="mt-3 px-56 py-3.5 w-full text-lg font-medium text-white bg-orange-400 rounded-xl"
                disabled={verifying || isSubmitting}
              >
                {verifying ? "Verifying..." : "Verify OTP"}
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordComponent;