import { useApiFetcher } from "@/hooks/useApiFetcher";
import Loading from "@/components/ui/Loading";
import Pagination from "@/components/ui/Pagination";

const DataFetcherWrapper = ({ endpoint, children, refresh }) => {
  const { data, pagination, page, setPage, isLoading, showPagination } =
    useApiFetcher(endpoint, refresh);

  if (isLoading) return <Loading />;

  return (
    <>
      {children({ data, refresh })}
      {showPagination && (
        <Pagination pagination={pagination} setPage={setPage} />
      )}
    </>
  );
};

export default DataFetcherWrapper;
