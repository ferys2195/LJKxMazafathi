import { currency } from "@/utils/currency";
import { fetching } from "@/utils/fetching";
import React, { useState } from "react";

function WithdrawForm({ accountId, maxValue, onWithdrawSuccess }) {
  const [rawValue, setRawValue] = useState(""); // Nilai asli tanpa format
  const [error, setError] = useState(""); // State untuk menyimpan pesan error
  const MAX_VALUE = Number(maxValue); // Batas maksimal

  // Handle perubahan input
  const handleChange = (e) => {
    // Ambil hanya angka (hapus semua karakter selain angka)
    const raw = e.target.value.replace(/\D/g, "");

    // Validasi: Cek apakah nilai melebihi batas maksimal
    if (Number(raw) > MAX_VALUE) {
      setError(`Nilai tidak boleh lebih dari ${currency.format(MAX_VALUE)}`);
      return; // Berhenti jika validasi gagal
    } else {
      setError(""); // Hapus pesan error jika validasi lolos
    }

    // Update state jika validasi berhasil
    setRawValue(raw);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = {
      account_id: accountId,
      amount: rawValue,
    };
    try {
      const createWithdraw = await fetching("transactions/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(params),
      });
      if (createWithdraw.status === "success") {
        onWithdrawSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <label>Masukkan Nominal (Maks: {currency.format(MAX_VALUE)}):</label>
      <label className="input input-bordered flex items-center gap-2 my-2">
        <input
          type="text"
          value={currency.format(rawValue)}
          onChange={handleChange}
          className="grow"
          placeholder="Masukan angka"
        />
        <button
          onClick={() => setRawValue(MAX_VALUE)}
          className="btn btn-sm btn-outline btn-success"
        >
          All
        </button>
      </label>

      {error && <small className="text-red-500 mt-2 block">{error}</small>}

      <div className="flex justify-end">
        <button onClick={handleSubmit} className="btn btn-primary">
          Withdraw Now
        </button>
      </div>
    </div>
  );
}

export default WithdrawForm;
