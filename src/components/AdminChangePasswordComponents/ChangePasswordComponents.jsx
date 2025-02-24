import  { useState } from "react";
import { InputField } from "../common/InputFiled/InputFiled";

const ChnagePsaswordComponentes = () => {
    const [formData, setFormData] = useState({
      lastpassword: "",
      newpassword: "",
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    return (
      <form className="flex flex-col mt-10 w-full max-md:max-w-full">
        <div className="flex flex-col w-full max-md:max-w-full">
          <InputField
            label="Last Password"
            name="username"
            type="password"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/f0d8eb242e9aa0b9b0c048c6b804fc7af3f7c1e6bc979f8f13f8e1e09a6bad9b?placeholderIfAbsent=true&apiKey=f1e3303ce7614e739d966e6db8bde094"
            value={formData.username}
            hasError={formData.username === ""}
            onChange={handleInputChange}
          />
          <div className="mt-4">
            <InputField
              label="New Password"
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
            className="gap-2.5 self-stretch px-56 py-3.5 w-full text-lg font-medium text-white bg-red-400 rounded-xl min-h-[52px] max-md:px-5 max-md:max-w-full"
          >
            Login Now
          </button>
  
        </div>
      </form>
    );
  };
  
  export default ChnagePsaswordComponentes;
  