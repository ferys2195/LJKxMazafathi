import React from "react";
import WalletCardItem from "./WalletCardItem";

function WalletList({ wallets }) {
  return (
    <>
      {Object.entries(wallets).map(([role, group]) => (
        <div key={role} className="mb-5">
          <h2 className="font-semibold text-xl border-b mb-3">
            {role.toUpperCase()}
          </h2>
          <div className="flex items-center gap-5">
            {group.map((wallet, i) => (
              <WalletCardItem key={i} wallet={wallet} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default WalletList;
