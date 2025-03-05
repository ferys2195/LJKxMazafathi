import React from "react";
import { formatDate } from "@/utils/date";

function VoucherHistoryTable({ vouchers }) {
  return (
    <table className="table table-zebra">
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Kepada</th>
          <th>Jenis Transaksi</th>
          <th>Jenis Voucher</th>
          <th>Jumlah</th>
        </tr>
      </thead>
      <tbody>
        {vouchers.length > 0 ? (
          vouchers.map((voucher, i) => (
            <tr key={i}>
              <td>{formatDate(voucher.date_transaction)}</td>
              <td>{voucher.account.name}</td>
              <td>
                <span
                  className={`badge w-1/3 ${
                    voucher.transaction_type === "in"
                      ? "badge-success"
                      : voucher.transaction_type === "out"
                      ? "badge-error"
                      : "badge-info"
                  }`}
                >
                  {voucher.transaction_type}
                </span>
              </td>
              <td>{voucher.voucher_type.name}</td>
              <td>{voucher.quantity} Pcs</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>Belum ada data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default VoucherHistoryTable;
