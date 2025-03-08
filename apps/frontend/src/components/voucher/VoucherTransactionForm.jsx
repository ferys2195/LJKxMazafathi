import { useEffect, useMemo, useState } from "react";
import { fetching } from "../../utils/fetching";
import { Bounce, toast, ToastContainer } from "react-toastify";

// const VoucherTransactionForm = ({ onTransactionSuccess }) => {
//   const [accounts, setAccounts] = useState([]);
//   const [voucherTypes, setVoucherTypes] = useState([]);
//   const [formData, setFormData] = useState({
//     account_id: "",
//     voucher_type_id: "",
//     transaction_type: "in",
//     quantity: 1,
//     date_transaction: "",
//     price_at_transaction: 0,
//     management_fee_at_transaction: 0,
//     agent_commission_at_transaction: 0,
//   });

//   useEffect(() => {
//     // Fetch akun dan voucher type dari API
//     fetching("accounts?role=agent").then(({ data }) => setAccounts(data));
//     fetching("vouchers").then(({ data }) => setVoucherTypes(data));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Jika memilih voucher type, ambil harga dan fee-nya
//     if (name === "voucher_type_id") {
//       const selectedVoucher = voucherTypes.find(
//         (v) => v.id === parseInt(value)
//       );
//       if (selectedVoucher) {
//         setFormData({
//           ...formData,
//           voucher_type_id: selectedVoucher.id,
//           price_at_transaction: selectedVoucher.base_price,
//           management_fee_at_transaction: selectedVoucher.management_fee,
//           agent_commission_at_transaction: selectedVoucher.agent_commission,
//         });
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetching("voucher-transactions", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify(formData),
//       });
//       onTransactionSuccess();

//       toast.success("Transaction created successfully!", {
//         position: "top-right",
//         autoClose: 1000,
//         hideProgressBar: true,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//       });
//     } catch (error) {
//       console.error("Error submitting transaction", error);
//       alert("Failed to create transaction.");
//     }
//   };

//   return (
//     <div className=" bg-white p-6 rounded-lg border">
//       <form onSubmit={handleSubmit}>
//         {/* Account Selection */}
//         <label className="block mb-2">Select Account:</label>
//         <select
//           name="account_id"
//           value={formData.account_id}
//           onChange={handleChange}
//           className="w-full select select-bordered mb-4"
//           required
//         >
//           <option value="">-- Select Account --</option>
//           {accounts.map((account) => (
//             <option key={account.id} value={account.id}>
//               {account.name}
//             </option>
//           ))}
//         </select>

//         {/* Voucher Type Selection */}
//         <label className="block mb-2">Select Voucher Type:</label>
//         <select
//           name="voucher_type_id"
//           value={formData.voucher_type_id}
//           onChange={handleChange}
//           className="w-full select select-bordered mb-4"
//           required
//         >
//           <option value="">-- Select Voucher Type --</option>
//           {voucherTypes.map((voucher) => (
//             <option key={voucher.id} value={voucher.id}>
//               {voucher.name} (Rp{voucher.base_price})
//             </option>
//           ))}
//         </select>

//         {/* Transaction Type Selection */}
//         <label className="block mb-2">Transaction Type:</label>
//         <select
//           name="transaction_type"
//           value={formData.transaction_type}
//           onChange={handleChange}
//           className="w-full select select-bordered mb-4"
//           required
//         >
//           <option value="in">In</option>
//           <option value="out">Out</option>
//           <option value="sold">Sold</option>
//         </select>

//         {/* Quantity */}
//         <label className="block mb-2">Quantity:</label>
//         <input
//           type="number"
//           name="quantity"
//           value={formData.quantity}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg mb-4"
//           min="1"
//           required
//         />

//         {/* Date Transaction */}
//         <label className="block mb-2">Date Transaction:</label>
//         <input
//           type="date"
//           name="date_transaction"
//           value={formData.date_transaction}
//           onChange={handleChange}
//           className="input input-bordered w-full mb-4"
//           required
//         />

//         {/* Auto-filled Prices */}
//         {/* <div className="bg-gray-100 p-4 rounded mb-4">
//           <p>Price at Transaction: Rp{formData.price_at_transaction}</p>
//           <p>Management Fee: Rp{formData.management_fee_at_transaction}</p>
//           <p>Agent Commission: Rp{formData.agent_commission_at_transaction}</p>
//         </div> */}

//         <button type="submit" className="btn btn-primary btn-block">
//           Submit Transaction
//         </button>
//       </form>
//     </div>
//   );
// };

const VoucherTransactionForm = ({ onTransactionSuccess }) => {
  const [accounts, setAccounts] = useState([]);
  const [voucherTypes, setVoucherTypes] = useState([]);
  const [formData, setFormData] = useState({
    account_id: "",
    voucher_type_id: "",
    transaction_type: "in",
    quantity: 1,
    date_transaction: "",
    price_at_transaction: 0,
    management_fee_at_transaction: 0,
    agent_commission_at_transaction: 0,
  });

  useEffect(() => {
    // Fetch akun dan voucher type dari API
    fetching("accounts?role=agent").then(({ data }) => setAccounts(data));
    fetching("vouchers").then(({ data }) => setVoucherTypes(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Jika memilih voucher type, ambil harga dan fee-nya
    if (name === "voucher_type_id") {
      const selectedVoucher = voucherTypes.find(
        (v) => v.id === parseInt(value)
      );
      if (selectedVoucher) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          voucher_type_id: selectedVoucher.id,
          price_at_transaction: selectedVoucher.base_price,
          management_fee_at_transaction: selectedVoucher.management_fee,
          agent_commission_at_transaction: selectedVoucher.agent_commission,
        }));
      }
    }

    // Reset transaction_type jika account_id berubah
    if (name === "account_id") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        transaction_type: value === "5" ? "in" : "out",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetching("voucher-transactions", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      });
      onTransactionSuccess();

      toast.success("Transaction created successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error submitting transaction", error);
      alert("Failed to create transaction.");
    }
  };

  // Tentukan opsi transaction_type secara dinamis
  const transactionTypeOptions = useMemo(() => {
    return formData.account_id === "5"
      ? [
          { value: "in", label: "In" },
          { value: "sold", label: "Sold" },
        ]
      : [
          { value: "out", label: "Out" },
          { value: "sold", label: "Sold" },
        ];
  }, [formData.account_id]);

  return (
    <div className="bg-white p-6 rounded-lg border">
      <form onSubmit={handleSubmit}>
        {/* Account Selection */}
        <label className="block mb-2">Select Account:</label>
        <select
          name="account_id"
          value={formData.account_id}
          onChange={handleChange}
          className="w-full select select-bordered mb-4"
          required
        >
          <option value="">-- Select Account --</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>

        {/* Voucher Type Selection */}
        <label className="block mb-2">Select Voucher Type:</label>
        <select
          name="voucher_type_id"
          value={formData.voucher_type_id}
          onChange={handleChange}
          className="w-full select select-bordered mb-4"
          required
        >
          <option value="">-- Select Voucher Type --</option>
          {voucherTypes.map((voucher) => (
            <option key={voucher.id} value={voucher.id}>
              {voucher.name} (Rp{voucher.base_price})
            </option>
          ))}
        </select>

        {/* Transaction Type (Dynamic) */}
        <label className="block mb-2">Transaction Type:</label>
        <select
          name="transaction_type"
          value={formData.transaction_type}
          onChange={handleChange}
          className="w-full select select-bordered mb-4"
          required
        >
          {transactionTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Quantity */}
        <label className="block mb-2">Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4"
          min="1"
          required
        />

        {/* Date Transaction */}
        <label className="block mb-2">Date Transaction:</label>
        <input
          type="date"
          name="date_transaction"
          value={formData.date_transaction}
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          required
        />

        <button type="submit" className="btn btn-primary btn-block">
          Submit Transaction
        </button>
      </form>
    </div>
  );
};

export default VoucherTransactionForm;
