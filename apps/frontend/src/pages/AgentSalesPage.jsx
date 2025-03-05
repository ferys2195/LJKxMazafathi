import { currency } from "@/utils/currency";
import { fetching } from "@/utils/fetching";
import React, { useEffect, useState } from "react";

function AgentSalesPage() {
  const [sales, setSales] = useState([]);
  const [voucherTypes, setVoucherTypes] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const { data } = await fetching("agent-sales");
      setSales(data);
      if (data.length > 0) {
        const types = data[0].sales_details.map((ds) => ds.voucher_type);
        setVoucherTypes(types);
      }
    };
    fetchSales();
  }, []);

  return (
    <>
      <div className="w-1/2 bg-white rounded-lg">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th rowSpan={2}>Nama Agen</th>
              <th colSpan={voucherTypes.length} className="text-center">
                Jenis Voucher
              </th>
              <th rowSpan={2}>Total Penjualan</th>
            </tr>
            <tr>
              {voucherTypes.map((type, index) => (
                <th key={index}>{type}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.name}</td>
                {sale.sales_details.map(({ quantity }, index) => (
                  <td key={index}>{quantity}</td>
                ))}
                <td>
                  {sale.total_sales > 0
                    ? currency.format(sale.total_sales)
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AgentSalesPage;
