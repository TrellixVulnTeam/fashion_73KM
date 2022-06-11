import React, { useEffect, useState } from "react";
import { Nav, Navbar, Container, Carousel, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import globalReducer from "../../../store/reducer";
import homeSaga from "../../../store/saga";
import {
  Badge,
  Dropdown,
  Menu,
  Space,
  message,
  Card,
  Spin,
  Image,
  Drawer,
} from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  LeftOutlined,
  RightOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import AddCart from "../addCart";

const { Meta } = Card;

function LoginHome() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [profile, setProfileUrl] = useState();
  const [visible, setVisible] = useState(false);
  const [spin, setspin] = useState(true);
  const [Drawervisible, setDrawerVisible] = useState(false);

  useInjectReducer({ key: "global", reducer: globalReducer });
  useInjectSaga({ key: "global", saga: homeSaga });

  const login = useSelector((state) => state.global.loginUser);
  const Allproducts = useSelector((state) => state.global.totalProducts);
  const Casualproducts = useSelector((state) => state.global.casualProduct);
  const sareeproduct = useSelector((state) => state.global.sareeProduct);
  const carts = useSelector((state) => state.global.carts);

  setTimeout(() => {
    setspin(false);
  }, 5000);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const token = { accessToken };
    dispatch({ type: "DATA_BY_ID", payload: token });
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

  useEffect(() => {
    dispatch({ type: "FETCH_CART" });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      let scroll = window.scrollY;
      if (scroll > 80) {
        const data = document.querySelector(".NavBar");
        data?.style.position = "sticky";
        data?.style.animation = "homebar 1s";
        data?.style.zIndex = 2;
      } else if (scroll < 80) {
        const data = document.querySelector(".NavBar");
        data?.style.position = '';
        data?.style.animation = "";
        data?.style.zIndex = "0";
      }
    });
  });

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  function onForword() {
    const slider = document.querySelector(".Product_card");
    slider.scrollLeft = slider.scrollLeft + 250;
  }
  function onBack() {
    const slider = document.querySelector(".Product_card");
    slider.scrollLeft = slider.scrollLeft - 250;
  }
  function onDrawer() {
    setDrawerVisible(true);
  }

  // const data = [];
  // for (let i = 0; i < 2; i++) {
  //   data.push(Allproducts[i]);
  // }
  return (
    <div>
      <Spin spinning={spin}>
        <Navbar collapseOnSelect expand="md" bg="light" className="NavBar">
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
                <Nav.Link className="menuHeading" href="#features">
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
        <div style={{ width: "95%", margin: "0 auto" }}>
          <Carousel variant="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/demox.jpg"
                alt="First slide"
              />
              <Carousel.Caption className="imageHeading">
                <h1 className="imageHeadingone">
                  New, Amazing <br />
                  Stuff Is Here
                </h1>
                <p style={{ color: "white" }} id="discountImg">
                  Shop today and get
                  <a style={{ fontWeight: "bolder" }}>20% discount</a>
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/demo14.jpg"
                alt="Second slide"
              />
              <Carousel.Caption className="imageHeading">
                <h1 className="imageHeadingtwo">
                  Get up to 30% Off <br />
                  New Arrivals
                </h1>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/demo17.jpg"
                alt="Third slide"
              />
              <Carousel.Caption className="imageHeading">
                <h1 className="imageHeadingthree">
                  FASHION <br />
                  CHANGEING
                  <br /> ALWAYS
                </h1>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        {/* <Spin spinning={spin}> */}
        <div className="midPics">
          <div className="midPicMain">
            <Image
              preview={false}
              src="/rech.webp"
              width="100%"
              height="100%"
            />
          </div>
          <div className="Casual_card">
            {Casualproducts.map((values, index) => {
              const pic = values.picture;
              return (
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <Card
                    key={index}
                    hoverable
                    style={{
                      width: 300,
                      borderRadius: 10,
                      margin: 40,
                    }}
                    cover={
                      <Image
                        src={`https://agile-earth-45664.herokuapp.com/images/${pic}`}
                        height={320}
                        width={300}
                        style={{ borderRadius: 10 }}
                        preview={false}
                      />
                    }
                    onClick={() => {
                      router.push({
                        pathname: "../CartPage/cartHome",
                        query: { id: values.id, type: "casual" },
                      });
                    }}
                  >
                    <Meta
                      title={`${values.productname}`}
                      description={`${values.price} Rs`}
                    />
                    <Meta
                      style={{ position: "absolute", right: 10, bottom: 28 }}
                      description={`Quantity : ${values?.quantity}`}
                    />
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
        {/* </Spin> */}

        {/* <Spin spinning={spin}> */}
        <div className="midPics2">
          <div className="Casual_card2">
            {sareeproduct.map((values, index) => {
              const pic = values.picture;
              return (
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <Card
                    key={index}
                    hoverable
                    style={{
                      width: 300,
                      borderRadius: 10,
                      margin: 40,
                    }}
                    cover={
                      <Image
                        src={`https://agile-earth-45664.herokuapp.com/images/${pic}`}
                        height={320}
                        width={300}
                        style={{ borderRadius: 10 }}
                        preview={false}
                      />
                    }
                    onClick={() => {
                      router.push({
                        pathname: "../CartPage/cartHome",
                        query: { id: values.id, type: "Saree" },
                      });
                    }}
                  >
                    <Meta
                      title={`${values.productname}`}
                      description={`${values.price} Rs`}
                    />
                    <Meta
                      style={{ position: "absolute", right: 10, bottom: 28 }}
                      description={`Quantity : ${values?.quantity}`}
                    />
                  </Card>
                </div>
              );
            })}
          </div>
          <div className="midPicMain2">
            <Image
              preview={false}
              src="/saree.jpg"
              width="100%"
              height="100%"
            />
          </div>
        </div>
        {/* </Spin> */}
        <h1
          style={{
            width: "95%",
            margin: "0 auto",
            textAlign: "center",
            paddingTop: 25,
          }}
        >
          All Products
        </h1>
        <div className="buttons">
          <div className="backword">
            <Button variant="info" onClick={onBack}>
              <LeftOutlined style={{ marginBottom: 5 }} />
            </Button>
          </div>
          <div className="forword">
            <Button variant="info" onClick={onForword}>
              <RightOutlined style={{ marginBottom: 5 }} />
            </Button>
          </div>
        </div>
        {/* <Spin spinning={spin}> */}
        <div className="Product_card">
          {Allproducts.map((values, index) => {
            const pic = values.picture;

            return (
              <div style={{ position: "relative" }}>
                <Card
                  key={index}
                  hoverable
                  style={{
                    minWidth: 240,
                    borderRadius: 10,
                    marginTop: 50,
                    marginRight: 10,
                  }}
                  cover={
                    <img
                      src={`https://agile-earth-45664.herokuapp.com/images/${pic}`}
                      height={220}
                      width={300}
                      style={{ borderRadius: 10 }}
                    />
                  }
                  onClick={() => {
                    router.push({
                      pathname: "../CartPage/cartHome",
                      query: { id: values.id, type: "AllProduct" },
                    });
                  }}
                >
                  <Meta
                    title={`${values.productname}`}
                    description={`${values.price} Rs`}
                  />
                  <Meta
                    style={{ position: "absolute", right: 10, bottom: 28 }}
                    description={`Quantity : ${values.quantity}`}
                  />
                </Card>
              </div>
            );
          })}
        </div>
        <div style={{ width: "95%", margin: "0 auto", marginTop: 30 }}>
          <footer
            className="text-center text-lg-start text-white"
            style={{ backgroundColor: "black" }}
          >
            <div className="container p-4 pb-0">
              <section className="">
                <div className="row">
                  <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold text-white">
                      Company name
                    </h6>
                    <p>
                      Here you can use rows and columns to organize your footer
                      content. Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit.
                    </p>
                  </div>

                  <hr className="w-100 clearfix d-md-none" />

                  <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold text-white">
                      Products
                    </h6>
                    <p>
                      <a className="text-white">Saree</a>
                    </p>
                    <p>
                      <a className="text-white">Casual Dresses</a>
                    </p>
                    <p>
                      <a className="text-white">T-shirts</a>
                    </p>
                    <p>
                      <a className="text-white">Lehnga</a>
                    </p>
                  </div>

                  <hr className="w-100 clearfix d-md-none" />

                  <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold text-white">
                      Useful links
                    </h6>
                    <p>
                      <a className="text-white">Your Account</a>
                    </p>
                    <p>
                      <a className="text-white">Become an Affiliate</a>
                    </p>
                    <p>
                      <a className="text-white">Shipping Rates</a>
                    </p>
                    <p>
                      <a className="text-white">Help</a>
                    </p>
                  </div>

                  <hr className="w-100 clearfix d-md-none" />

                  <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h6 className="text-uppercase mb-4 font-weight-bold text-white">
                      Contact
                    </h6>
                    <p>
                      <i className="fas fa-home mr-3"></i> Pakistan, Lahore
                      10012, PAK
                    </p>
                    <p>
                      <i className="fas fa-envelope mr-3"></i> info@gmail.com
                    </p>
                    <p>
                      <i className="fas fa-phone mr-3"></i>+ 92 3098800129
                    </p>
                  </div>
                </div>
              </section>

              <hr className="my-3" />
              <section className="p-3 pt-0">
                <div className="row d-flex align-items-center">
                  <div className="col-md-7 col-lg-8 text-center text-md-start">
                    <div className="p-3">
                      © 2020 Copyright:
                      <a className="text-white" href="https://mdbootstrap.com/">
                        BeautyFashion.com
                      </a>
                    </div>
                  </div>

                  <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                    <a
                      className="btn btn-outline-dark btn-floating m-1 text-white"
                      role="button"
                      style={{ borderRadius: "100px" }}
                    >
                      <Button variant="info" className="footerIcon">
                        <FacebookOutlined style={{ color: "lightgray" }} />
                      </Button>
                    </a>

                    <a
                      className="btn btn-outline-dark btn-floating m-1 text-white"
                      role="button"
                      style={{ borderRadius: "100px" }}
                    >
                      <Button variant="info" className="footerIcon">
                        <TwitterOutlined style={{ color: "lightgray" }} />
                      </Button>
                    </a>

                    <a
                      className="btn btn-outline-dark btn-floating m-1 text-white"
                      role="button"
                      style={{ borderRadius: "100px" }}
                    >
                      <Button variant="info" className="footerIcon">
                        <InstagramOutlined style={{ color: "lightgray" }} />
                      </Button>
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </footer>
        </div>
      </Spin>
    </div>
  );
}
export default LoginHome;
