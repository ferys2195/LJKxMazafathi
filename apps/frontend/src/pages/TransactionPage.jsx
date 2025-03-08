import DataFetcherWrapper from "@/components/common/DataFetcherWrapper";
import TransactionForm from "../components/transaction/TransactionForm";
import { FilterSection } from "@/components/transaction/FilterSection";
import { SummarySection } from "@/components/transaction/SummarySection";
import { TransactionTable } from "@/components/transaction/TransactionTable";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

function TransactionPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // State filter dari URL atau default
  const [filters, setFilters] = useState({
    date_from: searchParams.get("date_from") || "",
    date_to: searchParams.get("date_to") || "",
    category: searchParams.get("category") || "",
    account_id: searchParams.get("account_id") || "",
  });

  // State untuk menyimpan filter yang diterapkan
  const [appliedFilters, setAppliedFilters] = useState(filters);

  // State untuk memicu refresh data
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  // Update URL berdasarkan filter yang diterapkan
  const applyFilters = () => {
    const cleanedFilters = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value; // Hanya tambahkan yang tidak kosong
        return acc;
      },
      {}
    );

    setSearchParams(cleanedFilters);
    setAppliedFilters(filters); // Terapkan filter
    handleRefresh(); // Muat ulang data
  };

  // Sinkronkan URL jika halaman di-reload
  useEffect(() => {
    setAppliedFilters(filters);
  }, []);
  return (
    <>
      <div className="flex gap-5">
        <div className="flex-1 overflow-x-auto bg-white border rounded-xl w-3/4 p-5">
          {/* Pagination hanya di bagian tabel */}
          <DataFetcherWrapper endpoint="transactions" refresh={handleRefresh}>
            {({ data: transactions }) => (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  Transaction Logs
                </h2>
                <FilterSection
                  filters={filters}
                  setFilters={setFilters}
                  onApply={applyFilters}
                />
                <SummarySection filters={applyFilters} />
                <TransactionTable transactions={transactions} />
              </>
            )}
          </DataFetcherWrapper>
        </div>

        <div className="w-1/4 sticky top-0">
          <div className="bg-white rounded-xl border p-5">
            <h3 className="font-bold text-2xl mb-3">Add New Transaction</h3>
            <TransactionForm onTransactionAdded={handleRefresh} />
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default TransactionPage;
