import React from "react";
// import { Form, Upload, Input, Button } from "antd";
// import PictureOutlined from "@ant-design/icons";
import { Image } from "antd";
import { useInjectSaga } from "redux-injectors";
import { useDispatch, useSelector } from "react-redux";
import homeSaga from "../../../store/saga";

import "antd/dist/antd.css";

function CreateProduct() {
  const dispatch = useDispatch();

  useInjectSaga({ key: "global", saga: homeSaga });

  const login = useSelector((state) => state.global.loginUser);

  const data = login[0];
  // const onFinish = (values) => {
  //   const formValues = { ...values };
  //   dispatch({ type: "ADD_PRODUCT", payload: formValues });
  // };
  console.log(data);

  //   email: "talha@gamil.com"
  // firstname: "talha"
  // id: 1
  // lastname: "tariq"
  // password: "$2b$10$tyz.xQiG1snxX6xFhCM/VeeQqjecfLn7NUOlztcB4gAnYGkHNind."
  // phone: "03098800129"
  // picture: "cab8a4519952d7e99a6bc5610e653f2f"
  // token: "eyJhbGciOiJIUzI1NiI

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 30 }}>Client Information</h1>
      <div
        style={{
          width: "60%",
          backgroundColor: "whitesmoke",
          margin: "0 auto",
          marginTop: 30,
        }}
      >
        <div style={{ width: "100%" }}>
          <Image
            src={`https://agile-earth-45664.herokuapp.com/images/${data.picture}`}
            width={150}
            height={150}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
          <div style={{ flex: "50%", backgroundColor: "whitesmoke" }}>
            <h3>
              Name : {data.firstname} {data.lastname}
            </h3>
            <h3>Email : {data.email}</h3>
            <h3>Phone : {data.phone}</h3>
          </div>
          <div style={{ flex: "50%", backgroundColor: "whitesmoke" }}>
            <h3>Profession : Web Developer</h3>
            <h3>Experience : 1 years</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateProduct;

// <Form
//         name="basic"
//         labelCol={{
//           span: 8,
//         }}
//         wrapperCol={{
//           span: 16,
//         }}
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//         autoComplete="off"
//       >
//         <Form.Item label="Productname" name="productname">
//           <Input />
//         </Form.Item>

//         <Form.Item label="Price" name="price">
//           <Input />
//         </Form.Item>
//         <Form.Item label="Quantity" name="quantity" initialValue={1}>
//           <Input />
//         </Form.Item>
//         <Form.Item name="photo" label="Upload">
//           <Upload listType="picture-card" maxCount={1}>
//             <Button icon={<PictureOutlined />} />
//           </Upload>
//         </Form.Item>
//         <Form.Item
//           wrapperCol={{
//             offset: 8,
//             span: 16,
//           }}
//         >
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
