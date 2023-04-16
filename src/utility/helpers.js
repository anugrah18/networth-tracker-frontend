const getAccessTokenFromBrowser = () => {
  const access_token =
    localStorage.getItem("networthtracker-access-token") ||
    sessionStorage.getItem("networthtracker-access-token");

  return access_token;
};

export { getAccessTokenFromBrowser };
