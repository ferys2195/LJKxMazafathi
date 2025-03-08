import { currency } from "@/utils/currency";
import React from "react";
import { RxExternalLink } from "react-icons/rx";
import { Link } from "react-router";

const WalletCardItem = ({ wallet }) => {
  return (
    <div className="stats shadow bg-blue-500 bg-opacity-10 min-w-56">
      <div className="stat">
        <div className="stat-title">{wallet.name}</div>
        <div className="stat-value">
          {wallet.balance > 0 ? currency.format(wallet.balance) : "-"}
        </div>
        <div className="stat-actions">
          <Link to={`/income-report/${wallet.id}`} className="btn btn-sm">
            <RxExternalLink /> View Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WalletCardItem;
