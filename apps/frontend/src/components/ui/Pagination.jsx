const Pagination = ({ pagination, setPage }) => {
  return (
    <div className="p-3">
      <div className="join">
        {pagination.prev_page_url && (
          <button
            onClick={() => setPage(pagination.current_page - 1)}
            className="join-item btn btn-sm btn-outline"
          >
            Previous
          </button>
        )}
        {[...Array(pagination.last_page)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`join-item btn btn-sm btn-outline ${
              pagination.current_page === i + 1 ? "btn-active" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        {pagination.next_page_url && (
          <button
            className="join-item btn btn-sm btn-outline"
            onClick={() => setPage(pagination.current_page + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
