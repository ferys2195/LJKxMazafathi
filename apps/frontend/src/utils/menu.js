import { AiFillHome } from "react-icons/ai";
import { FaChartBar, FaMoneyBill1Wave } from "react-icons/fa6";
import { HiDocumentReport } from "react-icons/hi";
import { IoTicket } from "react-icons/io5";
import { MdStorefront } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { RiArrowUpDownLine } from "react-icons/ri";

export default function menuItems() {
  return [
    { label: "Beranda", icon: AiFillHome, link: "/" },
    {
      label: "Riwayat Transaksi",
      icon: RiArrowUpDownLine,
      link: "/transactions",
    }, // Banyak transaksi
    { label: "Manajemen Voucher", icon: IoTicket, link: "/voucher-management" }, // Halaman manajemen, bukan daftar
    { label: "Stok Agen", icon: PiUsersThreeFill, link: "/agent-stocks" }, // Banyak stok agen
    { label: "Penjualan Agen", icon: MdStorefront, link: "/agent-sales" }, // Banyak penjualan oleh agen
    { label: "Rekap Penjualan", icon: FaChartBar, link: "/sales-recap" }, // Rekapitulasi penjualan, bukan daftar transaksi
    {
      label: "Laporan Penghasilan",
      icon: FaMoneyBill1Wave,
      link: "/income-report",
    }, // Laporan umum, bukan daftar detail
  ];
}

// ✅ Manajemen Voucher
// ✅ Stok Agen
// ✅ Penjualan Agen
// ✅ Rekap Penjualan
// ✅ Laporan Penghasilan
