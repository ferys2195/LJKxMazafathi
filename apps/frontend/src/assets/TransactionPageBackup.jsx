import { useState, useEffect } from "react";
import TransactionForm from "../components/transaction/TransactionForm";
import { fetching } from "@/utils/fetching";
import { FilterSection } from "@/components/transaction/FilterSection";
import { SummarySection } from "@/components/transaction/SummarySection";
import { TransactionTable } from "@/components/transaction/TransactionTable";
import Loading from "@/components/ui/Loading";
import Pagination from "@/components/ui/Pagination";
import { ToastContainer } from "react-toastify";

function TransactionPageBackup() {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
  });
  const [transactions, setTransaction] = useState([]);
  const [pagination, setPagination] = useState({});
  const [showPagination, setShowPagination] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0); // State untuk trigger re-fetch
  const [isLoading, setisLoading] = useState(true);

  const fetchingTransaction = async () => {
    fetching(`transactions?page=${page}`).then(({ data }) => {
      setTransaction(data.data || []);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        prev_page_url: data.prev_page_url,
        next_page_url: data.next_page_url,
      });
      if (data.total > data.per_page) {
        setShowPagination(true);
      }
    });
  };

  useEffect(() => {
    fetchingTransaction();
    setisLoading(false);
  }, [page, refreshKey]);

  const handleTransactionSuccess = () => {
    setRefreshKey((prev) => prev + 1); // Trigger useEffect agar fetching ulang
  };
  if (isLoading) {
    return <Loading />; // Bisa diganti dengan skeleton atau spinner
  }
  return (
    <>
      <div className="flex gap-5">
        <div className="flex-1 overflow-x-auto bg-white border rounded-xl w-3/4 p-5">
          <h2 className="text-2xl font-semibold mb-4">Riwayat Transaksi</h2>
          <FilterSection filters={filters} setFilters={setFilters} />
          <SummarySection
            totalPemasukan={10000000}
            totalPengeluaran={2560000}
          />
          <TransactionTable transactions={transactions} />
          {showPagination ? (
            <Pagination pagination={pagination} setPage={setPage} />
          ) : null}
        </div>
        <div className="w-1/4 sticky top-0">
          <div className="bg-white rounded-xl border p-5">
            <h3 className="font-bold text-2xl mb-3">Add New Transaction</h3>
            {/* ✅ Pastikan `onTransactionAdded` dikirim ke TransactionForm */}
            <TransactionForm onTransactionAdded={handleTransactionSuccess} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default TransactionPageBackup;
