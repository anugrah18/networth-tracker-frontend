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
          <li>
            <a
              href="#"
              onClick={() => paginate(firstPageIndex)}
              className="text-lg mr-3 px-5 py-3 leading-tight   border  rounded-l-lg   bg-gray-800 border-gray-700 text-gray-300 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white cursor-pointer focus:bg-emerald-600 focus:border-emerald-600  focus:ring focus:ring-green-600"
            >
              First
            </a>
          </li>

          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <a
                href="#"
                onClick={() => paginate(pageNumber)}
                className="mr-3 px-5 py-3 leading-tight  bg-gray-800 border  border-gray-700 text-gray-300  hover:text-white hover:bg-emerald-600 hover:border-emerald-600 cursor-pointer focus:bg-emerald-600 focus:border-emerald-600  focus:ring focus:ring-green-600"
              >
                {pageNumber}
              </a>
            </li>
          ))}

          <li>
            <a
              href="#"
              onClick={() => paginate(lastPageIndex)}
              className="text-lg px-5 py-3 leading-tight border  rounded-r-lg  bg-gray-800 border-gray-700 text-gray-300  hover:text-white hover:bg-emerald-600 hover:border-emerald-600 cursor-pointer focus:bg-emerald-600 focus:border-emerald-600  focus:ring focus:ring-green-600"
            >
              Last
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
