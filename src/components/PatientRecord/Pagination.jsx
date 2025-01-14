import * as React from "react";

function Pagination() {
  return (
    <div className="flex flex-wrap gap-10 justify-between items-center self-center mt-8  max-w-full w-full">
      <div className="self-stretch text-xs text-zinc-500">
        Showing 1 to 10 of 100 entries
      </div>
      <div className="flex gap-1 items-center self-stretch my-auto">
        <button aria-label="Previous page" className="flex flex-col justify-center items-center self-stretch px-2.5 my-auto bg-zinc-100 h-[27px] min-h-[27px] w-[27px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/de3beea5a0e3412a0a7ae8d7930fb4cc8fd85b96d561677ab9d676eb070b73e8?placeholderIfAbsent=true&apiKey=f1e3303ce7614e739d966e6db8bde094"
            alt=""
            className="object-contain aspect-[0.54] w-[7px]"
          />
        </button>
        <button aria-current="page" className="self-stretch px-2.5 py-1.5 my-auto w-6 text-xs text-white whitespace-nowrap bg-red-400 min-h-[27px]">
          1
        </button>
        <button className="self-stretch px-2.5 my-auto text-xs text-black whitespace-nowrap bg-zinc-100 h-[27px] min-h-[27px] w-[27px]">
          2
        </button>
        <button className="self-stretch px-2.5 my-auto w-7 h-7 text-xs text-black whitespace-nowrap bg-zinc-100 min-h-[27px]">
          3
        </button>
        <span className="self-stretch px-2.5 my-auto w-7 h-7 text-xs text-black whitespace-nowrap bg-zinc-100 min-h-[27px]">
          ...
        </span>
        <button aria-label="Next page" className="flex flex-col justify-center items-center self-stretch px-2.5 my-auto bg-zinc-100 h-[27px] min-h-[27px] rotate-[-3.141592653589793rad] w-[27px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9de4bcc4a65177443f03f582ab33b2722b953768a754bfd0940e937018292b93?placeholderIfAbsent=true&apiKey=f1e3303ce7614e739d966e6db8bde094"
            alt=""
            className="object-contain aspect-[0.54] w-[7px]"
          />
        </button>
      </div>
    </div>
  );
}

export default Pagination;