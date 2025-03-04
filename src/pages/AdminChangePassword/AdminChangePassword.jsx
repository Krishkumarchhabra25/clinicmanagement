import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Importing a back arrow icon
import ChangePasswordComponent from "../../components/AdminChangePasswordComponents/ChangePasswordComponents";
const AdminChangePassword = () => {
    const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center min-h-screen w-full overflow-auto bg-stone-100 px-5 py-5">

    <div  className="flex flex-col justify-center p-9 bg-white rounded-3xl w-[663px] max-md:w-full">
 <button
 onClick={()=>navigate("/login")}
  className="flex items-center justify-center w-10 h-10 bg-[#FF7B54] rounded-full"
>
  <ArrowLeft className="w-6 h-6 text-white" />
</button>

      <div className="flex flex-col items-center self-center text-2xl font-medium text-black">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e6fd47307db288dffdaa831d7d589e9d3f30bb2d7146615a26989f83bc6016c?placeholderIfAbsent=true&apiKey=f1e3303ce7614e739d966e6db8bde094"
          alt="Admin Logo"
          className="object-contain w-[93px] aspect-[0.95]"
        />
        <div className="mt-5">Forgot Password</div>
      </div>
      <ChangePasswordComponent />
    </div>
  </div>
  )
}

export default AdminChangePassword
