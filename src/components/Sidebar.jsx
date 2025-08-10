import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect, useRef, useState } from "react";
import {
  MdDashboard,
  MdBook,
  MdCalculate,
  MdAssignment,
  MdMenuOpen,
  MdMenu,
} from "react-icons/md";

const links = [
  { label: "Dashboard", path: "/", icon: MdDashboard },
  { label: "Courses", path: "/courses", icon: MdBook },
  { label: "CGPA", path: "/cgpa", icon: MdCalculate },
  { label: "Assignments", path: "/assignments", icon: MdAssignment },
];

const Sidebar = ({ open, setOpen }) => {
  const { user } = useUser();
  const sidebarRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const sidebarBase =
    "fixed sm:static top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col z-50 transition-transform duration-300 ease-in-out shadow-xl border-r border-gray-700";
  const sidebarPosition = open ? "translate-x-0" : "-translate-x-full sm:translate-x-0";
  const sidebarSize = collapsed ? "w-16 p-2" : "w-64 p-4";

  if (!user) return null;

  return (
    <>
      {/* ✅ BACKDROP ON MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        className={`${sidebarBase} ${sidebarPosition} ${sidebarSize}`}
        aria-label="Sidebar navigation"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ✅ Title Section */}
        <div
          className={`mb-6 select-none font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 tracking-wide flex items-center justify-center transition-all duration-200
          ${collapsed ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl md:text-4xl"}`}
          title="Acadify"
        >
          {collapsed ? "📘" : "Acadify"}
        </div>

        {/* ✅ Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden sm:flex self-end mb-4 text-white text-xs hover:bg-gray-800 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all active:scale-95"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          tabIndex={0}
        >
          {collapsed ? <MdMenuOpen size={18} /> : <MdMenu size={18} />}
        </button>

        {/* ✅ User Info */}
        {!collapsed && (
          <div className="mb-6 px-2 select-none border-b border-gray-700 pb-3">
            <div className="text-sm text-gray-300">👋 Hello,</div>
            <div className="text-xl font-bold truncate">{user.name || "User"}</div>
          </div>
        )}

        {/* ✅ Navigation Links */}
        <nav
          className={`flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent
          ${collapsed ? "items-center" : ""}`}
          style={{ flexGrow: 1 }}
        >
          {links.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap
                ${
                  isActive
                    ? "bg-blue-700 border-l-4 border-blue-400 pl-[calc(1rem-4px)] font-semibold shadow-inner"
                    : "hover:bg-gray-800"
                }`
              }
              onClick={() => open && setOpen(false)}
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
