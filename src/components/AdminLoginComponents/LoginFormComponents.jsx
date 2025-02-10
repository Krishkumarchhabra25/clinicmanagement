import  { useState } from "react";
import { InputField } from "../common/InputFiled/InputFiled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { notifyError, notifySuccess } from "../../utils/toastHelper";

const LoginFormComponents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      notifySuccess("Login Successful!", { position: "top-right" });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } else if (loginUser.rejected.match(result)) {
      notifyError(result.payload || "Login Failed", { position: "top-right" });
    }
  };

  
    return (
      <form  onSubmit={handleSubmit} className="flex flex-col mt-10 w-full max-md:max-w-full">
        <div className="flex flex-col w-full max-md:max-w-full">
          <InputField
            label="Username/Email"
            name="identifier"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/f0d8eb242e9aa0b9b0c048c6b804fc7af3f7c1e6bc979f8f13f8e1e09a6bad9b?placeholderIfAbsent=true&apiKey=f1e3303ce7614e739d966e6db8bde094"
            value={formData.identifier}
            onChange={handleInputChange}
          />
          <div className="mt-4">
            <InputField 
              label="Password"
              name="password"
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/1495bd11d9f2fb22d25b52f15d70fdca55ac0cefc4306e32e8a9c9a992f57d82?placeholderIfAbsent=true&apiKey=f1e3303ce7614e739d966e6db8bde094"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              hasError={formData.username === ""}
              errorMessage="Username cannot be empty"
            />
          </div>
        </div>
        <div className="flex flex-col mt-5 w-full max-md:max-w-full">
          <button
            type="submit"
            disabled={loading}
            className="gap-2.5 self-stretch px-56 py-3.5 w-full text-lg font-medium text-white bg-red-400 rounded-xl min-h-[52px] max-md:px-5 max-md:max-w-full"
          >
          {loading ? "Logging in..." : "Login Now"}
          </button>
          <div className="flex justify-between items-center mt-5 w-full text-sm text-black">
            {/* Left Side */}
            <button type="button" className="text-left">Forgot Password?</button>
  
            {/* Right Side */}
            <button onClick={()=>navigate("/changepassword")} type="button" className="text-right">Change Password?</button>
          </div>
        </div>
      </form>
    );
  };
  
  export default LoginFormComponents;
  