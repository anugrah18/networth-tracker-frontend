const getAccessTokenFromBrowser = () => {
  const access_token =
    sessionStorage.getItem("networthtracker-access-token") ||
    localStorage.getItem("networthtracker-access-token");

  return access_token;
};

const monthMapping = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

const calculateNetworth = (asset, cash, liability) => {
  const netWorth = (asset + cash - liability).toFixed(2);
  return netWorth;
};

export { getAccessTokenFromBrowser, monthMapping, calculateNetworth };
