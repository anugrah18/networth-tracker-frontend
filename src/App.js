import { useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import Homepage from "./components/Homepage/Homepage";
import Register from "./components/Register/Register";
import axios from "axios";
import {
  API_DOMAIN_URL,
  API_GET_A_USER,
  API_GET_A_USER_ID,
} from "./utility/backendAPILinks";
import { getAccessTokenFromBrowser } from "./utility/helpers";
import { Route, Routes } from "react-router-dom";

function App() {
  const [userState, setUserState] = useState({});

  useEffect(() => {
    const detectLoginStatus = async () => {
      const access_token = getAccessTokenFromBrowser();

      if (access_token !== null) {
        const config = {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };

        //http calls for persistent login
        try {
          const { data } = await axios.get(
            `${API_DOMAIN_URL}/${API_GET_A_USER_ID}`,
            config
          );
          const userId = data?.userId;

          const userData = await axios.get(
            `${API_DOMAIN_URL}/${API_GET_A_USER}/${userId}`,
            config
          );
          if (userData?.data !== null) {
            const user = {
              userId: userData.data.userId,
              firstName: userData.data.firstName,
              lastName: userData.data.lastName,
              email: userData.data.email,
              isAdmin: userData.data.isAdmin,
            };

            setUserState({ user });
          }
        } catch (error) {
          return;
        }
      }
    };
    detectLoginStatus();
  }, []);

  return (
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
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
