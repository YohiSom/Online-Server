import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Form, Input, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./loginRegister.scss";
import { registerUser, loginUser } from "../../store/user-actions";
import { useNavigate } from "react-router-dom";
function LoginRegister() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const messageState = useSelector((state) => state.user.message);
  const [form] = Form.useForm();

  const { type, message, open } = messageState || {};
  const navigate = useNavigate();
  //   const onFinish = (values) => {
  //     console.log("Success:", values);
  //   };

  const onLogin = () => {
    dispatch(loginUser(name, password))
      .then(setName(""), setPassword(""))
      .then(form.setFieldsValue({ username: "", password: "" }));
  };

  const onRegister = () => {
    dispatch(registerUser(name, password))
      .then(setName(""), setPassword(""))
      .then(form.setFieldsValue({ username: "", password: "" }));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (user) {
    setTimeout(() => {
      navigate("/server");
    }, 3000);
  }

  return (
    <div className="form-wrapper">
      {open && <Alert className="alert-login" type={type} message={message} />}
      {!user && (
        <>
          {" "}
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={!register ? onLogin : onRegister}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input onChange={(e) => setName(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                {!register ? "Login" : "Register"}
              </Button>
            </Form.Item>
          </Form>
          <div>
            {!register
              ? "If you haven't registered yet "
              : "If you have registered before "}
            <button
              className="register-button"
              onClick={() => setRegister(!register)}
            >
              click here
            </button>{" "}
            {!register ? "to register" : "to login"}
          </div>
        </>
      )}
    </div>
  );
}

export default LoginRegister;
