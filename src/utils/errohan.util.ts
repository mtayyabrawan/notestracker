async function errohan(
  uri: string,
  options: {
    method?: string;
    credentials?: boolean;
    body?: object;
  } = {},
): Promise<any> {
  try {
    const response = await fetch(uri, {
      method: options.method,
      credentials: options.credentials ? "include" : "omit",
      headers: { "Content-Type": "application/json" },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const parsedRes = await response.json();
    return parsedRes;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        resStatus: false,
        error: "Server connection failed",
        long_error: err.message,
      };
    }
    return {
      resStatus: false,
      error: "Server connection failed",
      long_error: String(err),
    };
  }
}

export default errohan;
