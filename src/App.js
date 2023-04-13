import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import Homepage from "./components/Homepage/Homepage";
import Register from "./components/Register/Register";

function App() {
  const [userState, setUserState] = useState({});

  return (
    <div className="App">
      <UserContext.Provider value={{ userState, setUserState }}>
        {userState?.user == null ? (
          <Homepage></Homepage>
        ) : (
          <p>Logged In as {userState.user.email}</p>
        )}
      </UserContext.Provider>
      <Register></Register>
    </div>
  );
}

export default App;
