import LoginFormComponents from "../../components/AdminLoginComponents/LoginFormComponents"


const AdminLogin = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full overflow-auto bg-stone-100 px-5 py-5">
      <div className="flex flex-col justify-center p-9 bg-white rounded-3xl w-[663px] max-md:w-full">
        <div className="flex flex-col items-center self-center text-2xl font-medium text-black">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e6fd47307db288dffdaa831d7d589e9d3f30bb2d7146615a26989f83bc6016c?placeholderIfAbsent=true&apiKey=f1e3303ce7614e739d966e6db8bde094"
            alt="Admin Logo"
            className="object-contain w-[93px] aspect-[0.95]"
          />
          <div className="mt-5">ADMIN LOGIN</div>
        </div>
        <LoginFormComponents />
      </div>
    </div>
  );
};

export default AdminLogin;
