import React, { useState } from "react";

function AgentSalesPage() {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [vouchers, setVouchers] = useState({
    "3 Jam": "",
    "5 Jam": "",
    "1 Hari": "",
    "7 Hari": "",
    "30 Hari": "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in vouchers) {
      setVouchers((prev) => ({ ...prev, [name]: value }));
    } else if (name === "date") {
      setDate(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    // const jsonData = Object.entries(vouchers)
    //   .filter(([_, jumlah]) => jumlah !== "") // Hanya ambil yang memiliki jumlah
    //   .map(([voucher_type, jumlah]) => ({
    //     date: new Date(date).toLocaleDateString("id-ID"), // Format tanggal DD/MM/YYYY
    //     name,
    //     voucher_type,
    //     jumlah: Number(jumlah),
    //   }));

    // console.log(jsonData); // Output JSON ke console

    e.preventDefault();

    const jsonData = Object.entries(vouchers)
      .filter(([_, jumlah]) => jumlah !== "") // Hanya yang ada isinya
      .map(([voucher_type, jumlah]) => ({
        date: new Date(date).toLocaleDateString("id-ID"), // Format DD/MM/YYYY
        name,
        voucher_type,
        jumlah: Number(jumlah),
      }));

    console.log(jsonData); // Debugging

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzUD7qv5j2lxlgS8DNV9AgK7u4a80pAhxDzTvNMOUtgmOiD6opyvzXBUuWTG23zi15M/exec",
        {
          method: "POST",
          mode: "no-cors", // Tambahkan ini
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonData),
        }
      );

      const result = await response.text();
      console.log(result);
      alert("Data berhasil dikirim ke Google Sheet!");
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mengirim data!");
    }
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
            <input
              type="date"
              name="date"
              value={date}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <select
              name="name"
              value={name}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option disabled value="">
                Pilih Agen
              </option>
              <option value="Radiy">Radiy</option>
              <option value="Dayah">Dayah</option>
              <option value="Acil Enor">Acil Enor</option>
              <option value="Lainnya">Lainnya</option>
            </select>
            {Object.keys(vouchers).map((key) => (
              <input
                key={key}
                type="number"
                name={key}
                value={vouchers[key]}
                onChange={handleChange}
                placeholder={key}
                className="input input-bordered w-full"
              />
            ))}
            <button type="submit" className="btn btn-primary">
              Tambahkan
            </button>
          </form>
        </div>
      </dialog>

      <div className="w-1/2 bg-white rounded-lg">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th rowSpan={2}>Tanggal</th>
              <th rowSpan={2}>Nama Agen</th>
              <th colSpan={5} className="text-center">
                Jenis Voucher
              </th>
            </tr>
            <tr>
              <th>3 Jam</th>
              <th>5 Jam</th>
              <th>1 Hari</th>
              <th>7 Hari</th>
              <th>30 Hari</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>12/02/2025</td>
              <td>Acil Enor</td>
              <td>120</td>
              <td>50</td>
              <td>3</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Radiy</td>
              <td>120</td>
              <td>50</td>
              <td>3</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Dayah</td>
              <td>120</td>
              <td>50</td>
              <td>3</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AgentSalesPage;
