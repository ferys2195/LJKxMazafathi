import React, { useEffect, useState } from "react";
import { orderVoucher } from "../data/voucher";
import { fetching } from "../utils/fetching";

function AgentStockPage() {
  const [agents, setAgents] = useState([]);
  const [voucherTypes, setVoucherTypes] = useState([]);

  const getVoucherByAgen = () => {
    fetching("voucher-agents").then(({ data }) => {
      setAgents(data);
      if (data.length > 0) {
        const types = data[0].balances.map((b) => b.voucher_type);
        setVoucherTypes(types);
      }
    });
  };

  useEffect(() => {
    getVoucherByAgen();
  }, []);

  // console.log(voucherAgen);
  return (
    <>
      <h1 className="font-bold text-2xl mb-2 border-b">Daftar Order Voucher</h1>
      <div className="flex w-full gap-3">
        <div className="w-1/2 bg-base-100 p-2 rounded-lg">
          <table className="table">
            <thead>
              <tr>
                <th rowSpan={2}>Nama Agen</th>
                <th colSpan={5} className="text-center">
                  Jenis Voucher
                </th>
              </tr>
              <tr>
                {voucherTypes.map((type, index) => (
                  <th key={index}>{type}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td>{agent.name}</td>
                  {agent.balances.map((balance, index) => (
                    <td key={index}>{balance.quantity}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AgentStockPage;
