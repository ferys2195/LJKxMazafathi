import React, { useState } from "react";
import { FiHome } from "react-icons/fi";
import { HiDocumentReport } from "react-icons/hi";
import { IoTicket } from "react-icons/io5";
import menuItems from "../../utils/menu";
import { Link } from "react-router";
export default function Sidebar({ isCollapsed, ...props }) {
  const [menu, setMenu] = useState(menuItems);
  return (
    <div
      {...props}
      className={`hidden md:block overflow-y-auto transition-all duration-500 ${
        isCollapsed ? "w-0" : "w-72 p-4"
      } ${props.className || ""}`}
    >
      <header className="py-2 px-4 -mt-4 h-24 flex justify-center items-center border-b">
        <h1 className="text-2xl font-bold">LJK x Mazafathi</h1>
      </header>
      <nav className="menu leading-normal w-auto">
        <ul>
          {menu.map((item, index) => (
            <li key={index}>
              {item.subMenu ? (
                <details open>
                  <summary>
                    {item.icon && <item.icon />}{" "}
                    {/* Panggil sebagai function */}
                    {item.label}
                  </summary>
                  <ul>
                    {item.subMenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link to={subItem.link}>{subItem.label}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <Link to={item.link}>
                  {item.icon && <item.icon />} {/* Panggil sebagai function */}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
