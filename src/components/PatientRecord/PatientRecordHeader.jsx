import * as React from "react";
import MangeSearchIcon from "../../assets/manage_search.png";
import FilterManageIcon from "../../assets/filter_list.png";
import ExportIcon from "../../assets/file_export.png";
import arrowDown from "../../assets/arrow_drop_down.png"
const searchOptions = [
  { value: "name", text: "By Name (Default)" },
  { value: "id", text: "By Patient's ID" },
  { value: "phone", text: "By Patient's Phone Number" },
];

const sortOptions = [
  { value: "Name A-Z", text: "Name A-Z" },
  { value: "Name Z-A", text: "Name Z-A" },
  { value: "Registration Date (Newest to Oldest)", text: "Registration Date (Newest to Oldest)" },
  { value: "Registration Date (Oldest to Newest)", text: "Registration Date (Oldest to Newest)" },
  { value: "Mobile Number (Ascending)", text: "Mobile Number (Ascending)" },
  { value: "Mobile Number (Descending)", text: "Mobile Number (Descending)" },
  { value: "None", text: "None" },
];

function PatientListHeader() {
  const [isFilterVisible, setIsFilterVisible] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("name");
  const [selectedOptionBySort, setSelectedOptionBySort] = React.useState("Name A-Z");
  const [isSortByVisible, setIsSortByVisible] = React.useState(false);

  // Toggle filter visibility
  const toggleFilterOptions = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Toggle sort visibility
  const toggleSortByOptions = () => {
    setIsSortByVisible(!isSortByVisible);
  };

  // Handle filter option change
  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setIsFilterVisible(false); // Close dropdown after selection
  };

  // Handle sort option change
  const handleSortByOptionChange = (value) => {
    setSelectedOptionBySort(value);
    setIsSortByVisible(false); // Close dropdown after selection
  };

  // Get placeholder text based on selected filter
  const getPlaceholderText = () => {
    const option = searchOptions.find((opt) => opt.value === selectedOption);
    return option ? `Search by ${option.text.replace("By ", "")} Here` : "Search...";
  };

  return (
    <div className="relative flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-center self-stretch my-auto min-w-[240px] max-md:max-w-full">
        <div className="self-stretch my-auto text-xl text-gray-800" style={{ fontFamily: "Outfit" }}>
          Patient List
        </div>
        <div className="relative flex flex-wrap gap-1.5 items-center self-stretch px-4 py-2 my-auto text-sm bg-white rounded-3xl border border-solid border-stone-300 min-w-[240px] text-stone-300 w-[617px] max-md:max-w-full">
          <img
            loading="lazy"
            src={MangeSearchIcon}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
          />
          <input
            type="text"
            placeholder={getPlaceholderText()}
            className="flex-1 shrink  text-black self-stretch my-auto basis-0 max-md:max-w-full border-none focus:outline-none"
          />
          <img
            loading="lazy"
            src={FilterManageIcon}
            alt=""
            className="object-contain cursor-pointer shrink-0 self-stretch my-auto aspect-square w-[18px]"
            onClick={toggleFilterOptions}
          />
          {isFilterVisible && (
            <div className="absolute top-full left-0 mt-2 w-full text-black rounded-2xl bg-neutral-100 shadow-lg z-50">
              <div className="flex flex-row gap-6 p-4">
                {searchOptions.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={`option-${option.value}`}
                      name="searchOption"
                      value={option.value}
                      checked={selectedOption === option.value}
                      onChange={() => handleOptionChange(option.value)}
                      className="cursor-pointer appearance-none w-4 h-4 text-black rounded-full border border-gray-400 checked:bg-orange-500 checked:border-orange-500 focus:ring-2 focus:ring-orange-500"
                    />
                    <label htmlFor={`option-${option.value}`} className="cursor-pointer text-sm">
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="relative flex gap-2.5 items-center self-stretch  my-auto text-sm whitespace-nowrap text-neutral-400">
        <button
          onClick={toggleSortByOptions}
          className="flex gap-1.5 justify-center items-center self-stretch px-4 py-2 my-auto bg-white rounded-3xl border border-solid border-stone-300"
        >
          <span>Sort By</span>
          <img src={arrowDown} alt="arrow down" width={18} height={18}/>
        </button>
        {isSortByVisible && (
          <div
            className="absolute top-full mt-2 right-0 w-[327px] text-black rounded-2xl bg-neutral-100 shadow-lg z-50"
            style={{ maxHeight: "277px", overflowY: "auto" }}
          >
            <div className="flex flex-col gap-3 p-4">
              {sortOptions.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`sortOption-${option.value}`}
                    name="sortOption"
                    value={option.value}
                    checked={selectedOptionBySort === option.value}
                    onChange={() => handleSortByOptionChange(option.value)}
                    className="cursor-pointer appearance-none w-4 h-4 rounded-full border border-gray-400 checked:bg-orange-500 checked:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                  <label htmlFor={`sortOption-${option.value}`} className="cursor-pointer text-sm">
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        <button className="flex gap-1.5 justify-center items-center self-stretch px-4 py-2 my-auto bg-white rounded-3xl border border-solid border-stone-300">
          <img
            loading="lazy"
            src={ExportIcon}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
          />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
}

export default PatientListHeader;
