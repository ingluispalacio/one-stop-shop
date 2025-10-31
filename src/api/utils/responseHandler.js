export const handleSuccess = (message, data = null, context = "") => {
  return {
    success: true,
    message,
    context,
    data,
    timestamp: new Date().toISOString(),
  };
};

export const handleError = (error, context = "") => {
  console.error(`[${context}]`, error);

  const message =
    error?.message ||
    "Ocurrió un error inesperado. Intenta nuevamente más tarde.";

  return {
    success: false,
    message,
    context,
    raw: error, // para depuración avanzada
    timestamp: new Date().toISOString(),
  };
};
