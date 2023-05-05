const getAccessTokenFromBrowser = () => {
  const access_token =
    sessionStorage.getItem("networthtracker-access-token") ||
    localStorage.getItem("networthtracker-access-token");

  return access_token;
};

const monthMapping = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  July: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

export { getAccessTokenFromBrowser,monthMapping };
