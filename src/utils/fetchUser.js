export const fetchUser = () => {
  const userInfo =
    localStorage?.getItem("token") !== "undefined"
      ? JSON.parse(localStorage.getItem("token"))
      : localStorage.clear();
  return userInfo;
};
