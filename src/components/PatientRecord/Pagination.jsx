import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPatients } from "../../redux/slices/patinetSlice";

function Pagination() {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state) => state.patients);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(fetchAllPatients({ page }));
    }
  };

  return (
    <div className="flex flex-wrap gap-10 justify-between items-center self-center mt-8 max-w-full w-full">
      <div className="self-stretch text-xs text-zinc-500">
        Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, totalPages * 10)} of {totalPages * 10} entries
      </div>
      <div className="flex gap-1 items-center self-stretch my-auto">
        {/* Previous Button */}
        <button
          aria-label="Previous page"
          className={`flex justify-center items-center px-2.5 bg-zinc-100 h-[27px] w-[27px] ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-2.5 py-1.5 w-6 text-xs ${
              currentPage === i + 1 ? "text-white bg-red-400" : "text-black bg-zinc-100"
            } min-h-[27px]`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          aria-label="Next page"
          className={`flex justify-center items-center px-2.5 bg-zinc-100 h-[27px] w-[27px] ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default Pagination;
