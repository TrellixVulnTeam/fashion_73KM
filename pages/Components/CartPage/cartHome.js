import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { useInjectSaga, useInjectReducer } from "redux-injectors";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Dropdown,
  Menu,
  Space,
  message,
  Select,
  Collapse,
  Image,
  Drawer,
  Input,
  Spin,
} from "antd";
import homeSaga from "../../../store/saga";
import globalReducer from "../../../store/reducer";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import AddCart from "../addCart";

const { Panel } = Collapse;
const { Option } = Select;

function Cart() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [profile, setProfileUrl] = useState();
  const [spin, setspin] = useState(true);

  const [Drawervisible, setDrawerVisible] = useState(false);
  const size = [];
  const params = useRouter();
  const value = params.query;

  useInjectSaga({ key: "global", saga: homeSaga });
  useInjectReducer({ key: "global", reducer: globalReducer });

  const login = useSelector((state) => state.global.loginUser);
  const productId = useSelector((state) => state.global.productId);
  const carts = useSelector((state) => state.global.carts);

  console.log(productId);

  setTimeout(() => {
    setspin(false);
  }, 2000);

  useEffect(() => {
    dispatch({ type: "FETCH_PRODUCT_BY_ID", payload: value });
  }, []);

  useEffect(() => {
    if (login[0]?.id) {
      const pic = "https://joeschmoe.io/api/v1/random";
      setProfileUrl(pic);
    } else {
      setProfileUrl(
        "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
      );
    }
  });

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const handinputChange = (e) => {
    size.push(e);
  };
  const onDrawer = () => {
    setDrawerVisible(true);
  };
  function onaddCart() {
    const data = { productId, size: size[0] };
    dispatch({ type: "ADD_TO_CART", payload: data });
  }

  return (
    <div>
      <Spin spinning={spin}>
        <Navbar
          collapseOnSelect
          expand="md"
          bg="light"
          className="NavBar"
          style={{
            position: "-webkit-sticky",
            width: "100%",
            position: "sticky",
            top: 0,
            zIndex: 2,
          }}
        >
          <Container>
            <Navbar.Brand
              href="#home"
              style={{ position: "relative", right: "1rem" }}
            >
              <img src="/beauty.jpg" alt="..." width="140px" height="100px" />
            </Navbar.Brand>
            <Navbar.Toggle
              style={{
                borderColor: "transparent",
                color: "lightgray",
              }}
              aria-controls="responsive-navbar-nav"
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto" />
              <Nav>
                <Nav.Link
                  className="menuHeading"
                  onClick={() => {
                    router.push("../loginPage/homePage");
                  }}
                >
                  Home
                </Nav.Link>
                <Nav.Link className="menuHeading" href="#pricing">
                  Products
                </Nav.Link>
                <Nav.Link className="menuHeading" href="#p">
                  Contect Us
                </Nav.Link>
                <Nav.Link className="menuHeading" href="#deets">
                  More deets
                </Nav.Link>
                <Nav className="navbarCenter">
                  <Badge
                    count={carts.length}
                    style={{ position: "relative", top: -12, right: 7 }}
                  >
                    <Button
                      variant="info"
                      className="CartButton"
                      onClick={onDrawer}
                    >
                      <ShoppingCartOutlined className="CartIcon" />
                    </Button>
                    <Drawer
                      title="Added Cart"
                      visible={Drawervisible}
                      placement="right"
                      onClose={() => {
                        setDrawerVisible(false);
                      }}
                    >
                      <AddCart />
                    </Drawer>
                  </Badge>
                </Nav>
                <Nav style={{ marginTop: "5px" }}>
                  <Dropdown
                    overlay={() => {
                      return (
                        <div
                          style={{
                            backgroundColor: "white",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Menu>
                            <Menu.Item
                              key="two"
                              icon={<UserOutlined />}
                              onClick={() => {
                                router.push("../addItems");
                              }}
                            >
                              Profile
                            </Menu.Item>
                            <Menu.Item
                              key="three"
                              icon={<LogoutOutlined />}
                              onClick={() => {
                                router.push("/");
                                message.success("Logout");
                                dispatch({ type: "LOG_OUT" });
                              }}
                            >
                              Logout
                            </Menu.Item>
                          </Menu>
                        </div>
                      );
                    }}
                    onVisibleChange={handleVisibleChange}
                    visible={visible}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Button variant="info" className="menuProfile">
                          <img
                            style={{ position: "relative", bottom: 8 }}
                            src={profile}
                            alt="..."
                            width="30px"
                            height="25px"
                            className="img-fluid"
                          />
                        </Button>
                      </Space>
                    </a>
                  </Dropdown>
                </Nav>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="mainflex">
          <div className="flexone">
            <h2>{productId.productname}</h2>
            <h4>Rs {productId.price}</h4>
            <Select
              placeholder="Select a Size"
              onChange={handinputChange}
              allowClear
              style={{ width: "50%" }}
            >
              <Option value="small">small</Option>
              <Option value="medium">medium</Option>
              <Option value="large">large</Option>
            </Select>
            <h2 style={{ padding: "10px" }}>
              <Button
                variant="info"
                style={{
                  backgroundColor: "lightpink",
                  borderColor: "lightpink",
                }}
                onClick={onaddCart}
              >
                Add To Cart
              </Button>
            </h2>

            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Product Description" key="1">
                <p>
                  This light pink skirt made in soft crepe fabric features a
                  fixed belt with adjustable side zip closure and a flared
                  hemline.It can be paired with Raniz crop top & shrug to
                  complete the look. Length 45". Model is wearing size S. Model
                  height 5'7''.
                </p>
              </Panel>
              <Panel header="Material,Use & Care info" key="2">
                <p>
                  More Information Do Not Bleach, Do Not Tumble Dry, Do Not
                  Wring, Wash With Like Colors, Warm Iron Inside Out, Do Not
                  Iron Or Print On Embellished Surface
                </p>
              </Panel>
              <Panel header="Shipping & Return" key="3">
                <p>
                  Standard Order delivery takes 8-10 working days after
                  confirmation of the order, depending on the size and
                  availability of the product. Lulusar has a strict no return
                  policy. Items once purchased, cannot be returned unless found
                  to be of defective quality. You may exchange any item bought
                  from Lulusar within 7 days of receiving it, provided that the
                  purchase was made in Pakistan. The item must not be worn,
                  altered, or washed. Also, please note that the item(s) must be
                  in its original packing with the invoice. Items bought on sale
                  cannot be exchanged or refunded. However, if any purchased
                  items are defective, we will be willing to process a refund.
                  You can reach out to us at +923041118331 or
                  customercare@lulusar.com for any inquiry or assistance
                  required.
                </p>
              </Panel>
            </Collapse>
          </div>
          <div className="flextwo">
            <Image
              src={`https://agile-earth-45664.herokuapp.com/images/${productId.picture}`}
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <Drawer
          title="Basic Drawer"
          visible={Drawervisible}
          placement="right"
          onClose={() => {
            setDrawerVisible(false);
          }}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </Spin>
    </div>
  );
}
export default Cart;
