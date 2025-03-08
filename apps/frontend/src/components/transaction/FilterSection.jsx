import { fetching } from "@/utils/fetching";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";

export function FilterSection({ filters, setFilters, onApply }) {
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);

  // Ambil kategori dari API
  const fetchCategories = async () => {
    try {
      const { data } = await fetching("transaction-categories");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchAccounts = async () => {
    try {
      const { data } = await fetching("accounts");
      setAccounts(data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-4 hidden gap-2">
      <input
        type="date"
        className="input input-bordered"
        name="date_from"
        value={filters.date_from}
        onChange={handleChange}
      />
      <input
        type="date"
        className="input input-bordered"
        name="date_to"
        value={filters.date_to}
        onChange={handleChange}
      />
      <select
        className="select select-bordered "
        name="category"
        value={filters.category}
        onChange={handleChange}
      >
        <option value="">Semua Kategori</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        className="select select-bordered "
        name="account_id"
        value={filters.account_id}
        onChange={handleChange}
      >
        <option value="">Semua Account</option>
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.name}
          </option>
        ))}
      </select>
      <button className="btn btn-primary " onClick={onApply}>
        <FaFilter />
        Filter
      </button>
    </div>
  );
}
