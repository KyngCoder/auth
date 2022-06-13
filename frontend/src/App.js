import SignUp from "./SignUp";
import HomePage from "./HomePage";
import Login from "./Login";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/signup" element={<SignUp />} exact/>
        <Route path="/login" element={<Login />} exact/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
