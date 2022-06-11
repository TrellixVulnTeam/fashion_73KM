import { PictureOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
// import { useInjectReducer, useInjectSaga } from "redux-injectors";
// import homeSaga from "../../../store/saga";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 26 },
};

function CreateAccount() {
  const [createform] = Form.useForm();
  const dispatch = useDispatch();

  const onComplete = (values) => {
    const formValues = { ...values };
    dispatch({ type: "CREATE_ACCOUNT", payload: formValues });
  };
  return (
    <div>
      <div className="maindiv">
        <div className="heading">Create a Account</div>
        <div>
          <Form
            className="form"
            {...layout}
            name={createform}
            // autoComplete="off"
            layout="horizontal"
            onFinish={onComplete}
          >
            <Form.Item label="Firstname" name="firstname">
              <Input />
            </Form.Item>
            <Form.Item label="Lastname" name="lastname">
              <Input />
            </Form.Item>
            <Form.Item label="E-mail" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input />
            </Form.Item>
            <Form.Item label="Mobile Number" name="phoneNo">
              <Input />
            </Form.Item>
            <Form.Item name="photo" label="Upload">
              <Upload listType="picture-card" maxCount={1}>
                <Button icon={<PictureOutlined />} />
              </Upload>
            </Form.Item>
            <Form.Item className="submit">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default CreateAccount;
