import { Card, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/client";

export const ChangePassword = () => {
  const initialValues = {
    userName: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
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
      case "userName":
        if (!value) {
          newErrors.userName = "Usuario requerido";
        } else {
          delete newErrors.userName;
        }
        break;

      case "oldPassword":
        if (!value) {
          newErrors.oldPassword = "Contraseña actual requerida";
        } else {
          delete newErrors.oldPassword;
        }
        break;

      case "newPassword":
        if (!value) {
          newErrors.newPassword = "Contraseña nueva requerida";
        } else {
          delete newErrors.newPassword;
        }
        break;

      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Confirmar contraseña requerida";
        } else if (value !== values.newPassword) {
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

  const handleChangePassword = async () => {
    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      return;
    }
    try {
      const res = await apiClient.put(
        `/user/change-password/${values.userName}`,
        values
      );
      if (res.status === 200) {
        alert(res.data.message);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrors({
          userName: error.response.data.message,
        });
      } else if (error.response && error.response.status === 401) {
        setErrors({
          oldPassword: error.response.data.message,
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
        <h1 style={{ marginBottom: "20px" }}>Cambiar contraseña</h1>
        <Row justify="center" align="middle">
          <Col span={24} lg={48}>
            <Card className="card-container">
              <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                form={form}
                onFinish={handleChangePassword}
              >
                <Form.Item label="Usuario" htmlFor="userName" name="userName">
                  <Input
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
                  name="oldPassword"
                  label="Contraseña actual"
                  htmlFor="oldPassword"
                >
                  <Input.Password
                    name="oldPassword"
                    value={values.oldPassword}
                    placeholder="••••••••"
                    onChange={handleInputChange}
                    style={{ marginTop: "5px" }}
                  />
                </Form.Item>
                {errors.oldPassword && (
                  <small
                    style={{
                      color: "red",
                      marginBottom: "20px",
                      marginTop: "-30px",
                    }}
                  >
                    {errors.oldPassword}
                  </small>
                )}
                <Form.Item
                  name="newPassword"
                  label="Contraseña"
                  htmlFor="newPassword"
                >
                  <Input.Password
                    name="newPassword"
                    value={values.newPassword}
                    placeholder="••••••••"
                    onChange={handleInputChange}
                    style={{ marginTop: "5px" }}
                  />
                </Form.Item>
                {errors.newPassword && (
                  <small
                    style={{
                      color: "red",
                      marginBottom: "20px",
                      marginTop: "-30px",
                    }}
                  >
                    {errors.newPassword}
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
                  onClick={handleChangePassword}
                >
                  Cambiar
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
