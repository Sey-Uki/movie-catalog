import React from "react";
import { MenuFoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { Endpoints } from "../AppRoutes";
import { selectDefaultPath } from "../utils/helpers";

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem =>
  ({
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem);

const menuItems: MenuProps["items"] = [
  getItem("Menu", "sub1", <MenuFoldOutlined />, [
    getItem("Главная", "g1", <Link to={Endpoints.Main} />),
    getItem("Избранное", "g2", <Link to={Endpoints.Favorites} />),
    getItem("Оцененные", "g3", <Link to={Endpoints.Rated} />),
  ]),
];

export const Navigation = () => {

  const location = useLocation();

  return (
    <div className="menu">
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={[selectDefaultPath(location.pathname)]}
        mode="inline"
        items={menuItems}
      />
    </div>
  );
};
