import React from "react";
import "antd/dist/antd.css";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  LoginOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import "./navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(userActions.clearUser());
    navigate("/");
  };

  const items = [
    {
      label: user && "Logout",
      onClick: logOut,
    },
    {
      label: user && <Link to="/server">Server Dashboard</Link>,
    },
    {
      label: !user && "Welcome to Boot Server!",
    },
  ];
  return (
    <>
      <Menu className="menu-container" mode="horizontal" items={items} />
    </>
  );
}

export default Navbar;
