const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date
    .toLocaleDateString("en-ID", options)
    .replace(",", "");

  // Gantilah spasi dengan "-"
  return formattedDate.split(" ").join("-");
};

export { formatDate };
