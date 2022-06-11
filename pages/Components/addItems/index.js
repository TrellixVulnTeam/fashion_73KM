import React from "react";
import { Image } from "antd";
import { useInjectSaga } from "redux-injectors";
import { useSelector } from "react-redux";
import homeSaga from "../../../store/saga";

import "antd/dist/antd.css";

function CreateProduct() {
  useInjectSaga({ key: "global", saga: homeSaga });

  const login = useSelector((state) => state.global.loginUser);

  const data = login[0];

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
            src={`https://agile-earth-45664.herokuapp.com/images/${data?.picture}`}
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
