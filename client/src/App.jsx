import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";
import Profile from "./components/Profile";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
