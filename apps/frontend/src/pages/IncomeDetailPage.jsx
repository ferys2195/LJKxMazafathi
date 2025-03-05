import WalletTransactionTable from "@/components/wallet/WalletTransactionTable";
import { currency } from "@/utils/currency";
import { fetching } from "@/utils/fetching";
import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { Link, useParams } from "react-router";

function IncomeDetailPage() {
  const { id } = useParams();
  const [walletTrx, setWalletTrx] = useState(null);

  const getTransaction = async () => {
    const { data } = await fetching(`wallets/${id}`);
    setWalletTrx(data);
  };

  useEffect(() => {
    getTransaction();
  }, [id]);

  if (!walletTrx) {
    return "loading";
  }
  return (
    <div className="w-1/2">
      <div className="p-4 bg-white flex justify-between items-center shadow-sm rounded-lg">
        <Link to={"/income-report"} className="flex gap-3 items-center">
          <MdArrowBack />
          <h2 className="font-bold text-xl">{walletTrx.name}</h2>
        </Link>
        <span className="font-semibold text-xl">
          {currency.format(walletTrx.balance)}
        </span>
      </div>
      <div className="bg-white mt-10">
        <WalletTransactionTable transactions={walletTrx.transactions} />
      </div>
    </div>
  );
}

export default IncomeDetailPage;
