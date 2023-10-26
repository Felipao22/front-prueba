import { Card, Col, Input, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/client";
import { setUser } from "../../utils/sessionStorage";

export const Login = () => {
  const initialValues = {
    userName: "",
    password: "",
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      userName: values.userName,
      password: values.password,
    };

    let newErrors = {};

    if (!values.userName) {
      newErrors.userName = "Usuario requerido";
    }
    if (!values.password) {
      newErrors.password = "Contraseña requerida";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await apiClient.post("/user/login", data);
      const user = {
        idUsuario: res.data.user.idUsuario,
        nombre: res.data.user.nombre,
        apellido: res.data.user.apellido,
        password: res.data.user.password,
        userName: res.data.user.userName,
        facturas: res.data.user.facturas,
      };

      const userJSON = JSON.stringify(user);
      setUser(userJSON);
      navigate("/usuario");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrors({
          password: error.response.data.message,
        });
      } else if (error.response && error.response.status === 404) {
        setErrors({
          userName: error.response.data.message,
        });
      } else {
        console.error("Error de inicio de sesión:", error.message);
      }
    }
  };

  return (
    <main>
      <aside>
        <h1 style={{ marginBottom: "100px" }}>¡Bienvenido!</h1>
        <Row justify="center" align="middle">
          <Col span={24} lg={48}>
            <Card className="card-container">
              <h2 style={{ color: "white" }}>Iniciar sesión</h2>
              <form onSubmit={handleLogin}>
                <label htmlFor="userName">
                  Usuario
                  <Input
                    autoComplete="username"
                    type="text"
                    name="userName"
                    value={values.userName}
                    onChange={handleInputChange}
                    placeholder="Felipe22"
                    style={{ marginTop: "5px" }}
                  />
                  {errors.userName && (
                    <small style={{ color: "red", marginTop: "-30px" }}>
                      {errors.userName}
                    </small>
                  )}
                </label>
                <label htmlFor="password">
                  {" "}
                  Contraseña
                  <Input.Password
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    value={values.password}
                    placeholder="••••••••"
                    onChange={handleInputChange}
                    style={{ marginTop: "5px" }}
                  />
                  {errors.password && (
                    <small
                      style={{
                        color: "red",
                        marginBottom: "20px",
                        marginTop: "-30px",
                      }}
                    >
                      {errors.password}
                    </small>
                  )}
                </label>
                <button style={{ marginTop: "20px" }} type="submit">
                  Ingresar
                </button>
              </form>
              <div style={{ marginTop: "20px" }}>
                <a href="/register" style={{ marginRight: "20px" }}>
                  Registrarse
                </a>
                <a href="/change-password">Cambiar contraseña</a>
              </div>
            </Card>
          </Col>
        </Row>
      </aside>
    </main>
  );
};
