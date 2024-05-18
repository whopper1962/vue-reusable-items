export const onRequest = (config) => {
  if (import.meta.env.MODE === "development") {
    const { method, baseURL, url } = config;
    const fullUrl = `${baseURL}${url}`;
    console.log(`🚀 ${method?.toUpperCase()}: ${fullUrl} Request`, config);
  }
  return config;
};
