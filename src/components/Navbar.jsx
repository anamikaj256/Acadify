import { useLocation } from "react-router-dom";
import UserMenu from "./UserMenu";
import { MdMenu } from "react-icons/md";

const routeMap = {
  "": "Home",
  courses: "Courses",
  cgpa: "CGPA Calculator",
  assignments: "Assignments",
};

function computeBreadcrumb(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return ["Home"];
  return [
    "Home",
    ...parts.map((p) => routeMap[p] || p.charAt(0).toUpperCase() + p.slice(1)),
  ];
}

const Navbar = ({ onToggleSidebar }) => {
  const location = useLocation();
  const breadcrumbParts = computeBreadcrumb(location.pathname);
  const isLong = breadcrumbParts.length > 3;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-white to-gray-50 shadow-md border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left Side: Sidebar Toggle + Breadcrumb */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={onToggleSidebar}
            className="sm:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-200 active:scale-95 transition-all focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <MdMenu size={24} />
          </button>

          {/* Breadcrumb & Title */}
          <div className="flex flex-col">
            {/* Large screen breadcrumb */}
            <nav
              aria-label="breadcrumb"
              className="hidden sm:flex items-center gap-1 text-sm font-medium overflow-x-auto max-w-[70vw] scrollbar-hide"
            >
              {breadcrumbParts.map((part, i) => {
                if (isLong && i !== 0 && i !== breadcrumbParts.length - 1) {
                  if (i === 1) {
                    return (
                      <span
                        key="ellipsis"
                        className="mx-1 text-gray-400 select-none"
                      >
                        / ...
                      </span>
                    );
                  }
                  return null;
                }
                return (
                  <span
                    key={i}
                    className={`whitespace-nowrap ${
                      i === breadcrumbParts.length - 1
                        ? "text-gray-800 font-semibold"
                        : "text-gray-500 hover:text-gray-700 transition-colors"
                    }`}
                  >
                    {i > 0 && <span className="mx-1 text-gray-300">/</span>}
                    {part}
                  </span>
                );
              })}
            </nav>

            {/* Mobile: Current page title */}
            <span
              className="sm:hidden text-lg font-bold text-gray-800 truncate max-w-[70vw]"
              title={breadcrumbParts[breadcrumbParts.length - 1]}
            >
              {breadcrumbParts[breadcrumbParts.length - 1]}
            </span>
          </div>
        </div>

        {/* Divider on large screens */}
        <div className="hidden sm:block w-px h-6 bg-gray-200 mx-4" />

        {/* Right Side: User Menu */}
        <UserMenu />
      </div>
    </header>
  );
};

export default Navbar;
