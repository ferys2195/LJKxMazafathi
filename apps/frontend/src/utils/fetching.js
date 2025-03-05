async function fetching(endpoint, options = {}) {
  const req = await fetch(
    `http://backend.mazafathilink.test/api/${endpoint}`,
    options
  );
  const res = await req.json();
  return res;
}
export { fetching };
