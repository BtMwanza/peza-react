import React from "react";

function Pagination({ productsPerPage, totalProducts, paginate, currentPage }) {
  const pageNumbers = [];
  for (
    let index = 1;
    index <= Math.ceil(totalProducts / productsPerPage);
    index++
  ) {
    pageNumbers.push(index);
  }
  return (
    <div>
      <nav className="d-flex justify-content-center wow fadeIn">
        <ul className="pagination pg-blue">
          {/*  <li className="page-item disabled">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li> */}
          {pageNumbers.map((page) => (
            <li
              key={page}
              className={
                currentPage !== page ? "page-item " : "page-item active"
              }
            >
              <a className="page-link" href="#" onClick={() => paginate(page)}>
                {page}
                <span className="sr-only">(current)</span>
              </a>
            </li>
          ))}

          {/* <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
