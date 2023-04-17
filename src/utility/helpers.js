const getAccessTokenFromBrowser = () => {
  const access_token =
    sessionStorage.getItem("networthtracker-access-token") ||
    localStorage.getItem("networthtracker-access-token");

  return access_token;
};

export { getAccessTokenFromBrowser };
