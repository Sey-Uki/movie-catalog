import React from "react";
import { MenuFoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

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
    getItem("Главная", "g1", null),
    getItem("Избранное", "g2", null),
    getItem("Оцененные", "g3", null),
  ]),
];

export const MenuComponents = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  return (
    <div className="menu">
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["g1"]}
        mode="inline"
        items={items}
      />
    </div>
  );
};
