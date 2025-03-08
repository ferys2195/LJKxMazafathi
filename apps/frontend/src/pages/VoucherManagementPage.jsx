import { useEffect, useState } from "react";
import DataFetcherWrapper from "@/components/common/DataFetcherWrapper";
import VoucherTransactionForm from "@/components/voucher/VoucherTransactionForm";
import { ToastContainer } from "react-toastify";
import { LuHistory } from "react-icons/lu";
import VoucherBalanceList from "@/components/voucher/VoucherBalanceList";
import VoucherHistoryTable from "@/components/voucher/VoucherHistoryTable";
import { fetching } from "@/utils/fetching";

function VoucherManagamentPage() {
  const [voucherBalance, setVoucherBalance] = useState([]);

  // State untuk memicu refresh
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  const getBalance = async () => {
    try {
      const { data } = await fetching("voucher-balances/5");
      setVoucherBalance(data);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    getBalance();
  }, [refreshKey]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <VoucherBalanceList voucherBalanceList={voucherBalance} />

        <div className="flex gap-5">
          <div className="w-2/3">
            <h2 className="flex items-center gap-2 font-semibold text-neutral text-xl border-b mb-3">
              <LuHistory /> Voucher Distribution Logs
            </h2>
            <div className="bg-white rounded-lg border">
              <DataFetcherWrapper
                endpoint="voucher-transactions"
                refresh={handleRefresh}
              >
                {({ data: vouchers }) => (
                  <VoucherHistoryTable vouchers={vouchers} />
                )}
              </DataFetcherWrapper>
            </div>
          </div>

          <div className="w-1/3">
            <h2 className="flex items-center gap-2 font-semibold text-neutral text-xl border-b mb-3">
              Add Voucher Distribution
            </h2>
            <VoucherTransactionForm onTransactionSuccess={handleRefresh} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default VoucherManagamentPage;
