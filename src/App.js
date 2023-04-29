import { useEffect, useState, useMemo, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import Homepage from "./components/Homepage/Homepage";
import Register from "./components/Register/Register";
import axios from "axios";
import {
  API_DOMAIN_URL,
  API_GET_ALL_RECORDS,
  API_GET_A_USER_ID,
} from "./utility/backendAPILinks";
import { getAccessTokenFromBrowser } from "./utility/helpers";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ForgotPassword/ResetPassword";
import Navbar from "./components/Navbar/Navbar";
import Porfolio from "./components/Homepage/Portfolio/Porfolio";
import HomeRoute from "./components/Routes/Private/HomeRoute";
import Logout from "./components/Logout/Logout";
import Users from "./components/Users/Users";
import { RecordContext } from "./contexts/RecordContext";
import NotAuthorized from "./components/NotAuthorized/NotAuthorized";
import AdminRoute from "./components/Routes/Private/AdminRoute";
import WealthChart from "./components/WealthChart/WealthChart";
import PrivateRoute from "./components/Routes/Private/PrivateRoute";
import { recordsParser } from "./utility/recordsUtils";

function App() {
  const [userState, setUserState] = useState({});
  const [recordState, setRecordState] = useState([]);

  const updateUserState = async (access_token) => {
    if (access_token !== null) {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      //http calls for persistent login
      try {
        const { data: userData } = await axios.get(
          `${API_DOMAIN_URL}/${API_GET_A_USER_ID}`,
          config
        );

        if (userData?.data !== null) {
          const user = {
            userId: userData.userId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            isAdmin: userData.isAdmin,
            access_token: access_token,
          };

          setUserState((prev) => ({ ...prev, user }));
        }
      } catch (error) {
        return;
      }
    }
  };

  const updateRecordState = async (access_token) => {
    if (access_token !== null) {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      //http calls for getting records data
      try {
        const { data: recordsData } = await axios.get(
          `${API_DOMAIN_URL}/${API_GET_ALL_RECORDS}`,
          config
        );

        if (recordsData?.data !== null) {
          //Parse records into clean structured format.
          const record_data_clean = recordsParser(recordsData);

          // setRecordState((prev) => ({ ...prev, record_data_clean }))
          setRecordState(record_data_clean);
        }
      } catch (error) {
        return;
      }
    }
  };

  const detectLoginStatus = async () => {
    const access_token = getAccessTokenFromBrowser();
    updateUserState(access_token);    
    updateRecordState(access_token);
  };

  useEffect(() => {
    detectLoginStatus();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar User={userState}></Navbar>

        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <UserContext.Provider value={{ userState, setUserState }}>
                  <Homepage />
                </UserContext.Provider>
              }
            ></Route>
            <Route
              path="/portfolio"
              element={
                <UserContext.Provider value={{ userState, setUserState }}>
                  <RecordContext.Provider
                    value={{ recordState, setRecordState }}
                  >
                    <HomeRoute component={Porfolio} />
                  </RecordContext.Provider>
                </UserContext.Provider>
              }
            ></Route>
            <Route
              path="/wealth-chart"
              element={
                <UserContext.Provider value={{ userState, setUserState }}>
                  <RecordContext.Provider
                    value={{ recordState, setRecordState }}
                  >
                    <PrivateRoute component={WealthChart} />
                  </RecordContext.Provider>
                </UserContext.Provider>
              }
            ></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route
              path="/forgot-password/:token"
              element={<ResetPassword />}
            ></Route>
            <Route path="/logout" element={<Logout />}></Route>

            <Route
              path="/users"
              element={
                <UserContext.Provider value={{ userState, setUserState }}>
                  <AdminRoute component={Users} />
                </UserContext.Provider>
              }
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
