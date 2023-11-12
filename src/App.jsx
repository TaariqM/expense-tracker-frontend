import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Expenses from "./pages/Expenses";
import "./styling/sign_in.css";
import "./styling/error_text.css";
import "./styling/dashboard.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard/:id/:userName" element={<Dashboard />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route
            path="/:userId/:userName/:expenseFolderId/:expenseFolderName/expenses"
            element={<Expenses />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
