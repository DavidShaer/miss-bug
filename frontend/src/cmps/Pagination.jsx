// export function Pagination({ currentPage, totalPages, onPageChange }) {
//   return (
//     <div className="pagination">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         Previous
//       </button>

//       {[...Array(totalPages)].map((_, index) => (
//         <button
//           key={index + 1}
//           onClick={() => onPageChange(index + 1)}
//           className={currentPage === index + 1 ? "active" : ""}
//         >
//           {index + 1}
//         </button>
//       ))}

//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         Next
//       </button>
//     </div>
//   );
// }

export function Pagination({ currentPage, onPageChange, hasNext }) {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Previous
      </button>

      {/* Display current page */}
      <button className="active">{currentPage}</button>

      <button onClick={() => onPageChange(currentPage + 1)} disabled={!hasNext}>
        Next
      </button>
    </div>
  );
}
