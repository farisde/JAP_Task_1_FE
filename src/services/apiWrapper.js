const apiWrapper = async (endpoint, method = "GET", body = null) => {
  console.log(endpoint, method, body);
  const config = {
    method: method,
    body: body == null ? null : JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    process.env.REACT_APP_API_URL + endpoint,
    config
  );
  return await response.json();
};

export default apiWrapper;
