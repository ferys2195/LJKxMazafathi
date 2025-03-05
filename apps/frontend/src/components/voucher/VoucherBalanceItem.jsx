import React from "react";

function VoucherBalanceItem({ name, balance }) {
  return (
    <div className="rounded-xl border bg-base-100 p-3 lg:min-w-54">
      <h2 className="font-semibold uppercase border-b mb-3">{name}</h2>
      <div className="stat-value">{balance}</div>
    </div>
  );
}

export default VoucherBalanceItem;
