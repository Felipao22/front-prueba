import { Card, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/client";

export const Register = () => {
  const initialValues = {
    userName: "",
    password: "",
    confirmPassword: "",
    nombre: "",
    apellido: "",
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "nombre":
        if (!value) {
          newErrors.nombre = "Nombre requerido";
        } else {
          delete newErrors.nombre;
        }
        break;

      case "apellido":
        if (!value) {
          newErrors.apellido = "Apellido requerido";
        } else {
          delete newErrors.apellido;
        }
        break;

      case "userName":
        if (!value) {
          newErrors.userName = "Usuario requerido";
        } else {
          delete newErrors.userName;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Contraseña requerida";
        } else {
          delete newErrors.password;
        }
        break;

      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Confirmar contraseña requerida";
        } else if (value !== values.password) {
          newErrors.confirmPassword = "Las contraseñas no coinciden";
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleRegister = async () => {
    const data = {
      userName: values.userName,
      password: values.password,
      nombre: values.nombre,
      apellido: values.apellido,
    };

    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      return;
    }
    try {
      const res = await apiClient.post("/user", data);

      if (res.data.newUser) {
        alert(res.data.message);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else if (error.response && error.response.status === 409) {
        setErrors({
          userName: error.response.data.message,
        });
      } else {
        console.error("Error de inicio de sesión:", error.message);
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <main>
      <aside>
        <h1 style={{ marginBottom: "20px" }}>Registrarse</h1>
        <Row justify="center" align="middle">
          <Col span={24} lg={48}>
            <Card className="card-container">
              <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                form={form}
                onFinish={handleRegister}
              >
                <Form.Item label="Nombre" htmlFor="nombre" name="nombre">
                  <Input
                    type="text"
                    name="nombre"
                    value={values.nombre}
                    onChange={handleInputChange}
                    placeholder="Felipe"
                    style={{ marginTop: "5px" }}
                  />
                </Form.Item>
                {errors.nombre && (
                  <small style={{ color: "red", marginTop: "-30px" }}>
                    {errors.nombre}
                  </small>
                )}
                <Form.Item label="Apellido" htmlFor="apellido" name="apellido">
                  <Input
                    type="text"
                    name="apellido"
                    value={values.apellido}
                    onChange={handleInputChange}
                    placeholder="Aviani"
                    style={{ marginTop: "5px" }}
                  />
                </Form.Item>
                {errors.apellido && (
                  <small style={{ color: "red", marginTop: "-30px" }}>
                    {errors.apellido}
                  </small>
                )}
                <Form.Item label="Usuario" htmlFor="userName" name="userName">
                  <Input
                    autoComplete="user-name"
                    type="text"
                    name="userName"
                    value={values.userName}
                    onChange={handleInputChange}
                    placeholder="Ej. Felipe22"
                    style={{ marginTop: "5px" }}
                  />
                </Form.Item>
                {errors.userName && (
                  <small style={{ color: "red", marginTop: "-30px" }}>
                    {errors.userName}
                  </small>
                )}
                <Form.Item
                  name="password"
                  label="Contraseña"
                  htmlFor="password"
                >
                  <Input.Password
                    autoComplete="new-password"
                    name="password"
                    value={values.password}
                    placeholder="••••••••"
                    onChange={handleInputChange}
                    style={{ marginTop: "5px" }}
                  />
                </Form.Item>
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
                <Form.Item
                  name="confirmPassword"
                  label="Confirmar contraseña"
                  htmlFor="confirmPassword"
                >
                  <Input.Password
                    name="confirmPassword"
                    value={values.confirmPassword}
                    placeholder="••••••••"
                    onChange={handleInputChange}
                    style={{ marginTop: "5px" }}
                  />
                </Form.Item>
                {errors.confirmPassword && (
                  <small
                    style={{
                      color: "red",
                      marginBottom: "20px",
                      marginTop: "-30px",
                    }}
                  >
                    {errors.confirmPassword}
                  </small>
                )}
                <button
                  style={{
                    maxWidth: "100px",
                    marginTop: "20px",
                    backgroundColor: "blue",
                  }}
                  type="button"
                  onClick={handleRegister}
                >
                  Registrar
                </button>
              </Form>
              <button
                style={{ maxWidth: "100px", marginTop: "20px" }}
                onClick={handleBack}
              >
                Volver
              </button>
            </Card>
          </Col>
        </Row>
      </aside>
    </main>
  );
};
