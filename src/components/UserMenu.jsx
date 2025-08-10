import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const getInitials = () => {
    if (!user?.name) return "👤";
    return user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-200"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
          {getInitials()}
        </span>
        <span className="text-sm hidden sm:inline">{user?.name || "User"}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow z-10">
          <ul className="text-sm text-gray-700 divide-y">
            <li
              onClick={() => {
                navigate("/change-password");
                setOpen(false);
              }}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              🔒 Change Password
            </li>
            <li
              onClick={() => {
                navigate("/edit-profile");
                setOpen(false);
              }}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              📝 Edit Personal Info
            </li>
            <li
              onClick={handleLogout}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-red-600"
            >
              🚪 Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
