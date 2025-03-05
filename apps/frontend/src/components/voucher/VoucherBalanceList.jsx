import React from "react";
import VoucherBalanceItem from "./VoucherBalanceItem";

function VoucherBalanceList({ voucherBalanceList }) {
  return (
    <>
      <h2 className="font-semibold text-xl border-b">Voucher Remaining</h2>
      <div className="grid grid-cols-5 gap-5">
        {voucherBalanceList.map((item, i) => (
          <VoucherBalanceItem key={i} {...item} />
        ))}
      </div>
    </>
  );
}

export default VoucherBalanceList;
