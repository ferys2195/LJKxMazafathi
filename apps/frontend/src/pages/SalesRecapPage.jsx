import React, { useEffect, useRef, useState } from "react";
import { fetching } from "@/utils/fetching";
import { currency } from "@/utils/currency";
import { FaCopy, FaFilter } from "react-icons/fa6";

function SalesRecapPage() {
  const [recapSales, setRecapSales] = useState([]);
  const [period, setPeriod] = useState({});
  const [error, setError] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [loading, setLoading] = useState(false);

  // Fungsi untuk mengambil data berdasarkan year dan month
  const fetchRecapSales = async (year, month) => {
    try {
      setLoading(true);
      const response = await fetching(
        `recap-sales?year=${year}&month=${month}`
      );

      const { data, additional_information } = response;

      setRecapSales(data);
      setPeriod({
        date_from: additional_information.period.date_from,
        date_to: additional_information.period.date_to,
      });
      setError(null);
    } catch (error) {
      setError("Gagal mengambil data penjualan");
      console.error("Error fetching recap sales:", error);
    } finally {
      setLoading(false);
    }
  };

  // Ambil data saat pertama kali halaman dimuat
  useEffect(() => {
    fetchRecapSales(year, month);
  }, []);

  // Handle perubahan tahun
  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  // Handle perubahan bulan
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  // Jalankan filter berdasarkan year dan month
  const handleFilter = () => {
    fetchRecapSales(year, month);
  };

  if (loading) return <p>Memuat data...</p>;

  // Hitung total jumlah penjualan dari data yang sudah difilter
  const totalSales = recapSales.reduce(
    (acc, { total_amount }) => acc + total_amount,
    0
  );

  return (
    <div className="w-3/5 mx-auto ">
      {/* Filter */}
      <div className="flex items-center gap-3 w-full mb-5">
        <select
          name="year"
          className="select select-bordered"
          value={year}
          onChange={handleYearChange}
        >
          <option value="">Pilih Tahun</option>
          {[2025, 2024, 2023].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          name="month"
          className="select select-bordered"
          value={month}
          onChange={handleMonthChange}
        >
          <option value="">Pilih Bulan</option>
          {[
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
          ].map((monthName, index) => (
            <option key={index + 1} value={index + 1}>
              {monthName}
            </option>
          ))}
        </select>

        <button onClick={handleFilter} className="btn btn-primary">
          <FaFilter />
          Filter
        </button>
      </div>
      <div className="bg-white shadow-xl min-w-full border rounded-lg p-4 mb-5">
        {error ? (
          <p>{error}</p>
        ) : (
          <table className="table table-zebra">
            <caption className="border-b p-3">
              <h1 className="font-bold text-xl">
                Laporan Hasil Penjualan Voucher Wifi LJK di Desa Pamalian
              </h1>
              <div className="font-semibold mb-4">
                Periode :{" "}
                <time dateTime={period.date_from}>{period.date_from}</time> -{" "}
                <time dateTime={period.date_to}>{period.date_to}</time>
              </div>
            </caption>
            {/* head */}
            <thead>
              <tr>
                {/* <th>No</th> */}
                <th>Jenis Voucher</th>
                <th>Harga</th>
                <th>Terjual</th>
                <th>Sisa Voucher</th>
                <th>Jumlah Penjualan</th>
              </tr>
            </thead>
            <tbody>
              {recapSales.map((item, i) => (
                <tr key={i}>
                  <td>{item.voucher_type}</td>
                  <td>{currency.format(item.base_price)}</td>
                  <td>{item.total_sold}</td>
                  <td>{item.remaining_balance}</td>
                  <td>{currency.format(item.total_amount)}</td>
                </tr>
              ))}

              <tr className="font-bold border-t">
                <td colSpan="4" className="text-right">
                  Subtotal:
                </td>
                <td>{currency.format(totalSales)}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SalesRecapPage;
