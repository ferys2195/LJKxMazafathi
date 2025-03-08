import { currency } from "@/utils/currency";

export function TransactionTable({ transactions }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full  rounded-lg ">
          {/* head */}
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Penerima</th>
              <th>Deskripsi</th>
              <th>Kategori</th>
              <th>Tipe</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="hover">
                <td>{transaction.transaction_date}</td>
                <td>{transaction.account.name}</td>
                <td>{transaction.description}</td>
                <td>{transaction.transaction_category.name}</td>
                <td
                  className={`capitalize 
                    ${
                      transaction.transaction_type === "in"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                >
                  {transaction.transaction_type}
                </td>
                <td>
                  {transaction.transaction_type === "in" ? "+ " : "- "}
                  {currency.format(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
