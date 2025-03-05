import { useState, useEffect } from "react";
import { fetching } from "@/utils/fetching";

export const useApiFetcher = (endpoint, refreshKey = 0, params = {}) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showPagination, setShowPagination] = useState(false);

  const fetchData = async () => {
    // setIsLoading(true);
    try {
      // Buat query string dari parameter
      const queryParams = new URLSearchParams({ page, ...params }).toString();
      const response = await fetching(`${endpoint}?${queryParams}`);

      const { data } = response;

      setData(data.data || []);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        prev_page_url: data.prev_page_url,
        next_page_url: data.next_page_url,
      });

      setShowPagination(data.total > data.per_page);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, refreshKey, endpoint, JSON.stringify(params)]);

  const refresh = () => fetchData();

  return {
    data,
    pagination,
    page,
    setPage,
    isLoading,
    showPagination,
    refresh,
  };
};
