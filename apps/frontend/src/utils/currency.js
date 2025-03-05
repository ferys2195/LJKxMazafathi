const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0, // Mencegah tampilan desimal
  maximumFractionDigits: 0, // Mencegah tampilan desimal
});

export { currency };
