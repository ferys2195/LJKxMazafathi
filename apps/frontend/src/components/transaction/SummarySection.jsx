import { currency } from "@/utils/currency";
import { fetching } from "@/utils/fetching";
import { useEffect, useState } from "react";

export function SummarySection({ filters }) {
  const [summary, setSummary] = useState({ totalIn: 0, totalOut: 0, sisa: 0 });

  const fetchSummary = async () => {
    try {
      // Hanya kirim parameter yang tidak kosong
      const query = new URLSearchParams(
        Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value)
        )
      ).toString();

      const { data } = await fetching(`transactions/summary?${query}`);

      setSummary({
        totalIn: data.totalIn,
        totalOut: data.totalOut,
        sisa: data.totalIn - data.totalOut,
      });
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [filters]);
  console.log(summary);
  return (
    <div className="mb-4 p-2 bg-base-300 rounded-lg flex justify-around ">
      <div className="text-start">
        <h3 className="text-md font-semibold">Total Pemasukan</h3>
        <p className="text-green-500 text-lg font-bold">
          {currency.format(summary.totalIn)}
        </p>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="text-center">
        <h3 className="text-md font-semibold">Total Pengeluaran</h3>
        <p className="text-red-500 text-lg font-bold">
          {currency.format(summary.totalOut)}
        </p>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="text-end">
        <h3 className="text-md font-semibold">Sisa Saldo</h3>
        <p
          className={`text-lg font-bold ${
            summary.sisa >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {currency.format(summary.sisa)}
        </p>
      </div>
    </div>
  );
}
