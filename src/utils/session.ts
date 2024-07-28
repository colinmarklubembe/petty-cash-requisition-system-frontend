export const isSessionExpired = (): boolean => {
  const expirationTime = localStorage.getItem("expirationTime");
  if (!expirationTime) return true;
  return new Date().getTime() > parseInt(expirationTime, 10);
};
