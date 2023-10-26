import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/client";
import { clearUser, getUser } from "../../utils/sessionStorage";
import { TableUser } from "../tableUser/TableUser";
import { UserInfo } from "../userInfo/UserInfo";
import "./Usuario.css";

export const Usuario = () => {
  const user = getUser();
  const userParse = user ? JSON.parse(user) : null;

  const [dataUser, setDataUser] = useState(false);

  const bills = userParse?.facturas;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const showDataUser = () => {
    setDataUser(true);
  };

  const hideDataUser = () => {
    setDataUser(false);
  };

  const handleLogout = async () => {
    await apiClient.post("/user/logout");
    clearUser();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <main>
      <section>
        {dataUser ? (
          <>
            <UserInfo userParse={userParse} />
            <button style={{ marginTop: "20px" }} onClick={hideDataUser}>
              Volver
            </button>
          </>
        ) : (
          <>
            <button onClick={showDataUser}>Mi perfil</button>
            <TableUser bills={bills} />
          </>
        )}

        {!dataUser && (
          <button className="boton-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        )}
      </section>
    </main>
  );
};
