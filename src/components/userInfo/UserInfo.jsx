import { Card, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import apiClient from "../../utils/client";
import { getUser, setUser } from "../../utils/sessionStorage";
import "./UserInfo.css";

export const UserInfo = ({ userParse }) => {
  const initialValues = {
    nombre: userParse.nombre,
    apellido: userParse.apellido,
    userName: userParse.userName,
    password: userParse.password,
    facturas: userParse.facturas,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const currentUserData = JSON.parse(getUser());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues({ ...editedValues, [name]: value });
  };

  const handleCancelEdit = () => {
    setEditedValues({
      nombre: currentUserData.nombre,
      apellido: currentUserData.apellido,
      userName: currentUserData.userName,
      password: currentUserData.password,
      facturas: currentUserData.facturas,
    });
    setIsEditing(false);
    setErrors({});
  };

  const handleEditSubmit = async () => {
    const updateUserData = {
      ...currentUserData,
      ...editedValues,
    };

    let newErrors = {};

    if (!editedValues.nombre.trim()) {
      newErrors.nombre = "El campo no puede estar vacío";
    }
    if (!editedValues.apellido.trim()) {
      newErrors.apellido = "El campo no puede estar vacío";
    }
    if (!editedValues.userName.trim()) {
      newErrors.userName = "El campo no puede estar vacío";
    }
    if (!editedValues.password.trim()) {
      newErrors.password = "El campo no puede estar vacío";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await apiClient.put(`/user/${userParse.idUsuario}`, updateUserData);
      alert("Datos actualizados con éxito");
      setIsEditing(false);
      const userJSON = JSON.stringify(updateUserData);
      setUser(userJSON);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({
          userName: error.response.data.message,
        });
      } else {
        console.error(error.response.data);
      }
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Mis datos</h1>
      <Row justify="center" align="middle">
        <Col span={24} lg={48}>
          <Card className="card-container">
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              layout="horizontal"
              style={{ maxWidth: 1000 }}
              initialValues={editedValues}
            >
              <Form.Item className="label-form" label="Nombre" htmlFor="nombre">
                <Input
                  style={{ cursor: "default" }}
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={editedValues.nombre}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                {errors.nombre && (
                  <small style={{ color: "red" }}>{errors.nombre}</small>
                )}
              </Form.Item>
              <Form.Item label="Apellido" htmlFor="apellido">
                <Input
                  style={{ cursor: "default" }}
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={editedValues.apellido}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                {errors.apellido && (
                  <small style={{ color: "red" }}>{errors.apellido}</small>
                )}
              </Form.Item>
              <Form.Item label="Usuario" htmlFor="userName">
                <Input
                  autoComplete="user-name"
                  style={{ cursor: "default" }}
                  type="text"
                  id="userName"
                  name="userName"
                  value={editedValues.userName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                {errors.userName && (
                  <small style={{ color: "red" }}>{errors.userName}</small>
                )}
              </Form.Item>
              <Form.Item label="Contraseña" htmlFor="password">
                <Input.Password
                  style={{ cursor: "default" }}
                  type="password"
                  id="password"
                  name="password"
                  value={editedValues.password}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                {errors.password && (
                  <small style={{ color: "red" }}>{errors.password}</small>
                )}
              </Form.Item>
            </Form>

            {isEditing ? (
              <>
                <button
                  style={{ marginRight: "10px", backgroundColor: "blue" }}
                  onClick={handleEditSubmit}
                >
                  Guardar
                </button>
                <button onClick={handleCancelEdit}>Cancelar</button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)}>Editar</button>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};
