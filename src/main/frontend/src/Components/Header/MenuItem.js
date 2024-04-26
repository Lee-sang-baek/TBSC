import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import login from "../Imgs/login.png"; // 로고 이미지 임포트
import 'bootstrap/dist/css/bootstrap.min.css';
import './MenuItem.css';
function Menu() {
  const menuData = [
    {
      title: "광주관광기업지원센터",
      link: "",
      subMenuItems: [
        { title: "센터소개", link: "" },
        { title: "시설안내", link: "" },
        { title: "조직도", link: "" },
        { title: "오시는 길", link: "" },
      ],
    },
    {
      title: "운영 프로그램",
      link: "",
      subMenuItems: [
        { title: "창업 및 성장지원", link: "" },
        { title: "교육 및 컨설팅", link: "" },
        { title: "관광일자리 지원", link: "" },
      ],
    },
    {
      title: "입주기업 홍보관",
      link: "",
      subMenuItems: [
        { title: "기업 소개", link: "" },
        { title: "기업 홍보", link: "" },
      ],
    },
    {
      title: "센터 이용예약",
      link: "",
      subMenuItems: [{ title: "이용예약 안내", link: "" }],
    },
    {
      title: "알림마당",
      link: "",
      subMenuItems: [
        { title: "공지사항", link: "" },
        { title: "센터소식", link: "" },
        { title: "보도자료", link: "" },
      ],
    },
  ];

  return (
    <div className="menu-container">
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {menuData.map((menuItem, index) => (
                <NavDropdown
                  key={index}
                  title={menuItem.title}
                  id="collapsible-nav-dropdown"
                >
                  {menuItem.subMenuItems.map((subMenuItem, subIndex) => (
                    <NavDropdown.Item
                      key={subIndex}
                      href={subMenuItem.link}
                    >
                      {subMenuItem.title}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ))}
            </Nav>
            <Nav>

            </Nav>
          </Navbar.Collapse>
          <img src={login} alt="Login" className="login"/>
        </Container>
      </Navbar>
    </div>
  );
}

export default Menu;
