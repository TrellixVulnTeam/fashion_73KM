import { DeleteOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInjectSaga } from "redux-injectors";
import homeSaga from "../../../store/saga";

function AddCart() {
  const dispatch = useDispatch();

  useInjectSaga({ key: "global", saga: homeSaga });

  const carts = useSelector((state) => state.global.carts);

  return (
    <div>
      {carts.map((values) => {
        return (
          <div style={{ display: "flex", marginBottom: 5 }}>
            <div style={{ flex: "30%" }}>
              <Image
                src={`https://agile-earth-45664.herokuapp.com/images/${values.picture}`}
                height={100}
                width={100}
              />
            </div>

            <div style={{ flex: "50%" }}>
              <div style={{ fontSize: "12px", marginLeft: 5 }}>
                {values.productname}
              </div>
              <div style={{ fontSize: "12px", marginLeft: 5 }}>
                Rs {values.price}
              </div>
              <div
                style={{ display: "flex", flexDirection: "row", marginTop: 10 }}
              >
                <div
                  style={{
                    flex: "20%",
                    paddingLeft: 10,
                  }}
                >
                  <Button
                    type="primary"
                    onClick={() => {
                      dispatch({
                        type: "DECREMENT",
                        payload: { carts, id: values.id },
                      });
                    }}
                  >
                    -
                  </Button>
                </div>
                <div className="qty">{values.quantity}</div>
                <div
                  style={{
                    flex: "20%",
                    paddingLeft: 10,
                  }}
                >
                  <Button
                    type="primary"
                    onClick={() => {
                      dispatch({
                        type: "INCREMENT",
                        payload: { carts, id: values.id },
                      });
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            <div style={{ flex: "20%", padding: 20, paddingTop: 40 }}>
              <Button
                type="link"
                icon={<DeleteOutlined style={{ color: "red" }} />}
                style={{ fontSize: "12px" }}
                onClick={() => {
                  dispatch({
                    type: "DELETE_CART",
                    payload: { id: values.id },
                  });
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default AddCart;
