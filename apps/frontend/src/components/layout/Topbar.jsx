import React from "react";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

export default function Topbar({ isCollapsed, setIsCollapsed }) {
  return (
    <div className="navbar bg-gray-100">
      <div className="flex-1">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="btn btn-ghost"
        >
          {isCollapsed ? (
            <RiMenuUnfoldLine size={24} />
          ) : (
            <RiMenuFoldLine size={24} />
          )}
        </button>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
