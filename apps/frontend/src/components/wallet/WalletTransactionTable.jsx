import { currency } from "@/utils/currency";
import React from "react";

function WalletTransactionTable({ transactions }) {
  return (
    <table className="table w-full rounded-lg">
      {/* head */}
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Deskripsi</th>
          <th>Tipe</th>
          <th>Jumlah</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index} className="hover">
            <td>{transaction.transaction_date}</td>
            <td>{transaction.description}</td>
            <td
              className={
                transaction.type === "in" ? "text-green-500" : "text-red-500"
              }
            >
              {transaction.type}
            </td>
            <td>
              {transaction.type === "in" ? "+ " : "- "}
              {currency.format(transaction.amount)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default WalletTransactionTable;
