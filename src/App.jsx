import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ChangePassword } from "./components/ChangePassword";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
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
