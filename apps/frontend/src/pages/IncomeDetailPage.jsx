import { SummarySection } from "@/components/transaction/SummarySection";
import Modal from "@/components/ui/Modal";
import WalletTransactionTable from "@/components/wallet/WalletTransactionTable";
import WithdrawForm from "@/components/wallet/WithdrawForm";
import { currency } from "@/utils/currency";
import { fetching } from "@/utils/fetching";
import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { PiHandWithdraw } from "react-icons/pi";
import { Link, useParams } from "react-router";

function IncomeDetailPage() {
  const { id } = useParams();
  const [accountTrx, setAccountTrx] = useState(null);
  const [account, setAccount] = useState(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  const getTransaction = async () => {
    const { data, additional_information } = await fetching(
      `account-balances/${id}`
    );
    setAccount(additional_information.account);
    setAccountTrx(data.data);
  };

  useEffect(() => {
    getTransaction();
  }, [id, refreshKey]);

  if (!accountTrx) {
    return "loading";
  }
  return (
    <div className="w-3/4">
      <div className="p-4 bg-white flex justify-between items-center shadow-sm rounded-lg">
        <Link to={"/income-report"} className="flex gap-3 items-center">
          <MdArrowBack />
          <h2 className="font-bold text-xl">{account.name}</h2>
        </Link>
        <div className="flex gap-5 items-center">
          <span className="font-semibold text-xl">
            {currency.format(account.balance)}
          </span>
          <button
            className={`btn btn-outline btn-primary btn-sm ${
              account.balance < 10000 ? "btn-disable" : ""
            }`}
            onClick={() =>
              document.getElementById("modal-withdraw").showModal()
            }
            disabled={account.balance < 10000}
          >
            <PiHandWithdraw className="w-5 h-5" /> Withdraw
          </button>
        </div>
      </div>
      <div className="bg-white mt-10 p-5">
        <SummarySection filters={{ account_id: account.id }} />
        <WalletTransactionTable transactions={accountTrx} />
      </div>
      <Modal id={"modal-withdraw"} title={"Withdraw"} onClose={refreshKey}>
        <WithdrawForm
          maxValue={account.balance}
          accountId={id}
          onWithdrawSuccess={handleRefresh}
        />
      </Modal>
    </div>
  );
}

export default IncomeDetailPage;
