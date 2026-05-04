const SESSION_FLAG_KEY = "session_active";

export const setSessionFlag = () => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_FLAG_KEY, "1");
};

export const clearSessionFlag = () => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_FLAG_KEY);
};

export const hasSessionFlag = (): boolean => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_FLAG_KEY) === "1";
};
