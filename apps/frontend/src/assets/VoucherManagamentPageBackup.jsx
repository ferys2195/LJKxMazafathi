import React, { useEffect, useRef, useState } from "react";
import { fetching } from "@/utils/fetching";
import Pagination from "@/components/ui/Pagination";
import VoucherTransactionForm from "@/components/voucher/VoucherTransactionForm";
import { ToastContainer } from "react-toastify";
import { LuHistory } from "react-icons/lu";
import VoucherBalanceList from "@/components/voucher/VoucherBalanceList";
import VoucherHistoryTable from "@/components/voucher/VoucherHistoryTable";
import Loading from "@/components/ui/Loading";

function VoucherManagamentPageBackup() {
  const [voucher, setVoucher] = useState([]);
  const [voucherBalance, setVoucherBalance] = useState([]);
  const [pagination, setPagination] = useState({});
  const [showPagination, setShowPagination] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0); // State untuk trigger re-fetch
  const [isLoading, setisLoading] = useState(true);

  const getBalance = () => {
    fetching("voucher-balances/5").then(({ data }) => setVoucherBalance(data));
  };

  const getVoucher = () => {
    fetching(`voucher-transaction?page=${page}`).then(({ data }) => {
      setVoucher(data.data || []);
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
    getBalance();
    getVoucher();
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
      <div className="flex flex-col gap-3">
        <VoucherBalanceList voucherBalanceList={voucherBalance} />

        <div className="flex flex-row-reverse gap-5">
          <div className="w-2/3">
            <h2 className="flex items-center gap-2 font-semibold text-neutral text-xl border-b mb-3">
              <LuHistory /> Logs
            </h2>
            <div className="bg-white rounded-lg border">
              <VoucherHistoryTable vouchers={voucher} />
            </div>
            {showPagination ? (
              <Pagination pagination={pagination} setPage={setPage} />
            ) : null}
          </div>
          <div className="w-1/3">
            <h2 className="flex items-center gap-2 font-semibold text-neutral text-xl border-b mb-3">
              Add Voucher Distribution
            </h2>
            <VoucherTransactionForm
              onTransactionSuccess={handleTransactionSuccess}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default VoucherManagamentPageBackup;
