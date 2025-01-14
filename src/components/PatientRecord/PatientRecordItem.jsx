
function PatientListItem({ name, mobile, email, registrationDate, villageDetails, avatar, editIcon, deleteIcon }) {
    return (
      <div className="flex flex-wrap gap-4 items-center py-2 pr-px pl-1.5 mt-2.5 w-full rounded-md border border-solid border-zinc-100 max-md:max-w-full">
        <div className="flex grow shrink gap-1.5 items-center self-stretch my-auto text-xs text-gray-800 w-[214px]">
          <img
            loading="lazy"
            src={avatar}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
          />
          <div className="flex-1 shrink self-stretch my-auto basis-0">{name}</div>
        </div>
        <div className="grow shrink gap-1.5 self-stretch my-auto text-xs text-gray-800 w-[119px]">
          {mobile}
        </div>
        <div className="grow shrink gap-1.5 self-stretch my-auto text-xs text-gray-800 whitespace-nowrap w-[127px]">
          {email}
        </div>
        <div className="grow shrink gap-1.5 self-stretch my-auto text-xs text-gray-800 w-[83px]">
          {registrationDate}
        </div>
        <div className="grow shrink gap-1.5 self-stretch my-auto text-xs text-gray-800 w-[150px]">
          {villageDetails}
        </div>
        <div className="flex  shrink gap-4 justify-center items-center self-stretch my-auto w-[111px]">
          <button aria-label="Edit patient">
            <img
              loading="lazy"
              src={editIcon}
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            />
          </button>
          <button aria-label="Delete patient">
            <img
              loading="lazy"
              src={deleteIcon}
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            />
          </button>
        </div>
      </div>
    );
  }
  
  export default PatientListItem;