export const onResponse = (response) => {
  if (import.meta.env.MODE === "development") {
    const { method, baseURL, url } = response.config;
    const { status } = response;
    const fullUrl = `${baseURL}${url}`;
    console.log(
      `📬 ${method?.toUpperCase()}: ${fullUrl} Response(${status})`,
      response,
    );
  }
  return response;
};
