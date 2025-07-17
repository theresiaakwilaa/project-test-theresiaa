const Pagination = ({ total, currentPage, setPage, perPage = 10 }) => {
  const totalPages = Math.ceil(total / perPage);
  
  // Jika hanya ada 1 halaman, tidak perlu pagination
  if (totalPages <= 1) return null;
  
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Jumlah halaman yang ditampilkan
    
    if (totalPages <= showPages) {
      // Jika total pages <= 5, tampilkan semua
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Jika lebih dari 5, tampilkan dengan logika
      const start = Math.max(1, currentPage - Math.floor(showPages / 2));
      const end = Math.min(totalPages, start + showPages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* Previous Button */}
      <button
        className={`px-3 py-2 rounded-md transition-colors ${
          canGoPrevious 
            ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
        onClick={() => canGoPrevious && setPage(currentPage - 1)}
        disabled={!canGoPrevious}
      >
        Previous
      </button>

      {/* First page if not in range */}
      {pageNumbers[0] > 1 && (
        <>
          <button
            className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
            onClick={() => setPage(1)}
          >
            1
          </button>
          {pageNumbers[0] > 2 && (
            <span className="px-2 text-gray-500">...</span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          className={`px-3 py-2 rounded-md transition-colors ${
            currentPage === pageNum
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          onClick={() => setPage(pageNum)}
        >
          {pageNum}
        </button>
      ))}

      {/* Last page if not in range */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <button
            className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
            onClick={() => setPage(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        className={`px-3 py-2 rounded-md transition-colors ${
          canGoNext 
            ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
        onClick={() => canGoNext && setPage(currentPage + 1)}
        disabled={!canGoNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;