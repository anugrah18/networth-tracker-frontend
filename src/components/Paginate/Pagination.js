import React from "react";

export default function Pagination(props) {
  const { itemsPerPage, totalItems, paginate } = props;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const firstPageIndex = 1;
  const lastPageIndex = pageNumbers[pageNumbers.length - 1];

  return (
    <div className="w-full mx-auto  place-items-center ">
      <div className="">
        <ul className="my-10 flex items-center justify-left md:justify-center">
          <li
            onClick={() => paginate(firstPageIndex)}
            className="text-lg mr-3 px-5 py-3 leading-tight   border  rounded-l-lg   bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            First
          </li>

          {pageNumbers.map((pageNumber) => (
            <li
              onClick={() => paginate(pageNumber)}
              key={pageNumber}
              className="mr-3 px-5 py-3 leading-tight  bg-gray-800 border  border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {pageNumber}
            </li>
          ))}

          <li
            onClick={() => paginate(lastPageIndex)}
            className="px-5 py-3 leading-tight border  rounded-r-lg  bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Last
          </li>
        </ul>
      </div>
    </div>
  );
}
