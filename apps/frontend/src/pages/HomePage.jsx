import React from "react";
import { stockVoucher } from "../data/voucher";

function HomePage() {
  return (
    <div>
      <div className="stats shadow w-2/3">
        <div className="stat p-5">
          <div className="stat-title">Total Penjualan Bulan Lalu</div>
          <div className="stat-value">500 Voucher</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Pendapatan Bulan Lalu</div>
          <div className="stat-value">Rp. 4.000.000</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-title">Voucher Terlaris</div>
          <div className="stat-value">3 Jam (300 Terjual)</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>
      <div className="w-1/3 bg-base-100 p-2 mt-5 rounded-lg">
        <table className="table table-xs">
          <caption className="p-3 border-b">
            <h1 className="font-semibold">Stock Voucher sampai bulan lalu</h1>
          </caption>
          {/* head */}
          <thead>
            <tr>
              <th>Jenis Voucher</th>
              <th>Stock Awal</th>
              <th>Terjual</th>
              <th>Sisa</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {stockVoucher.map((stock) => (
              <tr>
                <td>{stock.voucherType}</td>
                <td>{stock.stockAwal}</td>
                <td>{stock.terjual}</td>
                <td>{stock.stockAwal - stock.terjual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;
