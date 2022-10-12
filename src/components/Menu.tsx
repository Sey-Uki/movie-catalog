import React from "react";
import { MenuFoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Menu", "sub1", <MenuFoldOutlined />, [
    getItem("Главная", "g1", <Link to="/" />),
    getItem("Избранное", "g2", <Link to="/favorites" />),
    getItem("Оцененные", "g3", <Link to="/rated" />),
  ]),
];

export const MenuComponents = () => {
  return (
    <div className="menu">
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={["g1"]}
        mode="inline"
        items={items}
      />
    </div>
  );
};
