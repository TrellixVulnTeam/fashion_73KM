import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, message, Modal, Spin } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import globalReducer from "../store/reducer";
import homeSaga from "../store/saga";
import "antd/dist/antd.css";

function Home() {
  const [spinn, setspin] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useInjectSaga({ key: "global", saga: homeSaga });
  useInjectReducer({ key: "global", reducer: globalReducer });

  const visible = useSelector((state) => state.global.visible);
  const login = useSelector((state) => state.global.loginUser);

  function onFinish(values) {
    const formValues = { ...values };
    dispatch({ type: "LOGIN_FORM", payload: formValues });

    if (login.length != 0) {
      setTimeout(() => {
        message.success("Login");
        router.push("./Components/loginPage/homePage");
        setspin(false);
      }, 3000);
      setspin(true);
    }
  }

  return (
    <div>
      <div className="image" />
      <div className="Sign_in">
        <div className="Signin_div">
          <div className="heading_div">ShoppingMart</div>
          <div className="title_div">Welcome To ShoppingMart</div>
          <Spin spinning={spinn}>
            <Form
              name="login"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                className="name_div"
                name="useremail"
                rules={[
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input
                  className="name_input_div"
                  prefix={<UserOutlined />}
                  placeholder="E-mail"
                />
              </Form.Item>
              <Form.Item
                className="password_div"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  className="password_input_div"
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item className="forget_div">
                <a
                  onClick={() => {
                    dispatch({ type: "VISIBLE", payload: true });
                  }}
                >
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item className="button_div">
                <Button type="primary" htmlType="submit" className="button">
                  Log in
                </Button>
              </Form.Item>
              <Form.Item className="footer">
                New ShoppingMart?
                <u
                  className="footer_account"
                  onClick={() => {
                    router.push("./Components/signup/sign");
                  }}
                >
                  Create Account
                </u>
              </Form.Item>
            </Form>
          </Spin>
          <Modal
            visible={visible}
            title="forget"
            onCancel={() => {
              dispatch({ type: "VISIBLE", payload: false });
            }}
            destroyOnClose
          >
            <p>sssssssssss</p>
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default Home;
