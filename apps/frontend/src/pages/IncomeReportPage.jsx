import WalletList from "@/components/wallet/WalletList";
import { currency } from "@/utils/currency";
import { fetching } from "@/utils/fetching";
import React, { useEffect, useState } from "react";
import { RxExternalLink } from "react-icons/rx";

function IncomeReportPage() {
  const [wallets, setWallets] = useState([]);

  const fetchWallets = async () => {
    try {
      const { data } = await fetching("wallets");
      setWallets(data);
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  if (wallets.length === 0) {
    return "loading...";
  }

  return <WalletList wallets={wallets} />;
}

export default IncomeReportPage;
