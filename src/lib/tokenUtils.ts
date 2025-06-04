const ACCESS_TOKEN_KEY = "token";

export const getToken = () => {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.error("Failed to get access token:", error);
    return null;
  }
};

export const setToken = (token: string) => {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch (error) {
    console.error("Failed to set access token:", error);
  }
};

export const clearToken = () => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.error("Failed to clear access token:", error);
  }
};

const tokenUtils = {
  getToken,
  setToken,
  clearToken,
};

export default tokenUtils;
