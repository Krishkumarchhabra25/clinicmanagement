import Navigation from "./SideBaravigation";

const Template = ({ children }) => {
    return (
      <div className="flex min-w-full min-h-screen">
        {/* Sidebar */}
        <div className="max-md:hidden fixed left-0 top-0 min-h-screen z-10">
          <Navigation />
        </div>
        
        {/* Main Content */}
        <div className="flex-grow max-md:pl-0 pl-[306px] bg-[#F8F7F3]">
          <div className="min-h-screen px-8 py-4">{children}</div> {/* Add padding for better layout */}
        </div>
      </div>
    );
  };
  
  export default Template;