import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ChangePassword } from "./components/changePassword/ChangePassword";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { Usuario } from "./components/usuario/Usuario";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route exact path="/change-password" element={<ChangePassword />} />
      </Routes>
    </>
  );
}

export default App;
