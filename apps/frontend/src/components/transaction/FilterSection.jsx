import { fetching } from "@/utils/fetching";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";

export function FilterSection({ filters, setFilters, onApply }) {
  const [categories, setCategories] = useState([]);

  // Ambil kategori dari API
  const fetchCategories = async () => {
    try {
      const { data } = await fetching("transaction-categories");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="hidden mb-4  gap-2">
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
      <button className="btn btn-primary " onClick={onApply}>
        <FaFilter />
        Filter
      </button>
    </div>
  );
}
