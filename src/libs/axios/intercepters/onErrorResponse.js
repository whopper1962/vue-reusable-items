export const onErrorResponse = (error) => {
  if (import.meta.env.MODE === "development") {
    console.error(error);
  }
  return Promise.reject(error);
};
