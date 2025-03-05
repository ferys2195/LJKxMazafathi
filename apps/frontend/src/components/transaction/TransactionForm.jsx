import { fetching } from "@/utils/fetching";
import { useState, useEffect } from "react";
import { Bounce, toast } from "react-toastify";

function TransactionForm({ onTransactionAdded }) {
  const [formData, setFormData] = useState({
    account_id: "",
    transaction_category_id: "",
    amount: "",
    description: "",
    transaction_type: "Out",
    transaction_date: "",
  });

  const [keepData, setKeepData] = useState(false); // ✅ State untuk checkbox
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [error, setError] = useState(null);
  const [errorAccounts, setErrorAccounts] = useState(null);

  useEffect(() => {
    const fetchAccounts = () => {
      fetching("accounts").then(({ data }) => {
        setAccounts(data);
      });
    };
    const fetchCategories = () => {
      fetching("transaction-categories").then(({ data }) => {
        setCategories(data);
      });
    };
    fetchAccounts();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetching("transactions", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(formData),
      });

      onTransactionAdded(); // ✅ Refresh data transaksi

      toast.success("Transaction created successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      if (!keepData) {
        setFormData({
          account_id: "",
          transaction_category_id: "",
          amount: "",
          description: "",
          transaction_type: "out",
          transaction_date: "",
        });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      {error && <p className="text-red-500">{error}</p>}

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Account Name</span>
        </div>
        {loadingAccounts ? (
          <p className="text-gray-500">Loading accounts...</p>
        ) : errorAccounts ? (
          <p className="text-red-500">{errorAccounts}</p>
        ) : (
          <select
            name="account_id"
            value={formData.account_id}
            onChange={handleChange}
            className="select select-bordered w-full "
          >
            <option disabled value="">
              Select Account
            </option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        )}
      </label>

      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Amount</span>
        </div>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount..."
          className="input input-bordered w-full "
        />
      </label>

      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Description</span>
        </div>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description..."
          className="input input-bordered w-full "
        />
      </label>

      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Transaction Type</span>
        </div>
        <div className="flex gap-x-5">
          <label className="flex gap-2 label cursor-pointer">
            <input
              type="radio"
              name="transaction_type"
              value="Out"
              checked={formData.transaction_type === "Out"}
              onChange={handleChange}
              className="radio checked:bg-red-500"
            />
            <span className="label-text">Out</span>
          </label>
          <label className="flex gap-2 label cursor-pointer">
            <input
              type="radio"
              name="transaction_type"
              value="In"
              checked={formData.transaction_type === "In"}
              onChange={handleChange}
              className="radio checked:bg-green-500"
            />
            <span className="label-text">In</span>
          </label>
        </div>
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Category</span>
        </div>
        <select
          name="transaction_category_id"
          value={formData.transaction_category_id}
          onChange={handleChange}
          className="select select-bordered w-full "
        >
          <option disabled value="">
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Transaction Date</span>
        </div>
        <input
          type="date"
          name="transaction_date"
          value={formData.transaction_date}
          onChange={handleChange}
          className="input input-bordered w-full "
        />
      </label>

      <button
        type="submit"
        className="btn btn-block btn-primary"
        disabled={loading}
      >
        {loading ? "Processing..." : "Submit"}
      </button>

      {/* ✅ Checkbox untuk menyimpan data */}
      <label className="flex gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={keepData}
          onChange={() => setKeepData(!keepData)}
          className="checkbox"
        />
        <span className="label-text">Keep form data after submit</span>
      </label>
    </form>
  );
}

export default TransactionForm;
