import { useLocation, Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import { MdMenu } from "react-icons/md";

const routeMap = {
  "": "Home",
  courses: "Courses",
  cgpa: "CGPA Calculator",
  assignments: "Assignments",
};

// only breadcrumb logic changed below
function computeBreadcrumb(pathname) {
  const parts = pathname.split("/").filter(Boolean);

  // define canonical order of our known routes
  const routeOrder = ["", "courses", "cgpa", "assignments"];

  // find the index of the last route from routeOrder that appears in the pathname
  // special case: if pathname is "/", treat as index 0 (Home)
  let lastMatchedIndex = -1;
  for (let i = routeOrder.length - 1; i >= 0; i--) {
    const key = routeOrder[i];
    if (key === "" && parts.length === 0) {
      lastMatchedIndex = 0;
      break;
    }
    if (key !== "" && parts.includes(key)) {
      lastMatchedIndex = i;
      break;
    }
  }

  // if we matched one of the canonical routes, return the chain up to that index
  if (lastMatchedIndex >= 0) {
    return routeOrder
      .slice(0, lastMatchedIndex + 1)
      .map((k) => routeMap[k] || (k.charAt(0).toUpperCase() + k.slice(1)));
  }

  // fallback: original behaviour (map path segments to labels)
  if (parts.length === 0) return ["Home"];
  return [
    "Home",
    ...parts.map((p) => routeMap[p] || p.charAt(0).toUpperCase() + p.slice(1)),
  ];
}

const Navbar = ({ onToggleSidebar }) => {
  const location = useLocation();
  const breadcrumbParts = computeBreadcrumb(location.pathname);

  // --- changed compression logic ---
  // Keep the canonical 4-item chain visible (Home, Courses, CGPA, Assignments)
  const canonicalChain = [
    routeMap[""],
    routeMap["courses"],
    routeMap["cgpa"],
    routeMap["assignments"],
  ];
  const isCanonical =
    breadcrumbParts.length === canonicalChain.length &&
    canonicalChain.every((label, idx) => breadcrumbParts[idx] === label);

  // Only compress when the breadcrumbs are longer than the canonical chain OR
  // when not the canonical chain. This prevents hiding Courses/CGPA for Assignments.
  const isLong = breadcrumbParts.length > 4 || (!isCanonical && breadcrumbParts.length > 3);
  // --- end changed compression logic ---

  // helper to map label back to actual path
  const findPath = (label) => {
    if (label === "Home") return "/";
    const found = Object.entries(routeMap).find(([key, value]) => value === label);
    return found ? `/${found[0]}` : "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-white to-gray-50 shadow-md border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 min-w-0">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={onToggleSidebar}
            className="sm:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-200 active:scale-95 transition-all focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <MdMenu size={24} />
          </button>

          <div className="flex flex-col">
            {/* Desktop Breadcrumbs - now clickable! */}
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

                const isLast = i === breadcrumbParts.length - 1;
                const path = findPath(part); // convert name to URL path
                return (
                  <span key={i} className="whitespace-nowrap flex items-center">
                    {i > 0 && <span className="mx-1 text-gray-300">/</span>}
                    {isLast ? (
                      <span className="text-gray-800 font-semibold">
                        {part}
                      </span>
                    ) : (
                      <Link
                        to={path}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {part}
                      </Link>
                    )}
                  </span>
                );
              })}
            </nav>

            {/* Mobile Title */}
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

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
};

export default Navbar;
