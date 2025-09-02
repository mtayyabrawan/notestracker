async function errohan(uri, options) {
  try {
    const response = await fetch(uri, {
      method: options.method,
      credentials: options.credentials ? "include" : "omit",
      headers: { "Content-Type": "application/json" },
      body: options.body && JSON.stringify({ ...options.body }),
    });
    const parsedRes = await response.json();
    return parsedRes;
  } catch (err) {
    return {
      resStatus: false,
      error: "Server connection failed",
      long_error: err.message,
    };
  }
}

export default errohan;
