import React from "react";
import { useCourse } from "../context/CourseContext";


const CourseTable = ({
  // editing/action props
  editingId = null,
  onStartEdit,
  onDelete: onDeleteProp,
  renderRowInputs,
  showActions = true,
  showCode = true,
  // generic table props
  rows = null,
  columns = null,
  className = "",
}) => {
  // Pull courses and helpers directly from context
  const {
    courses: contextCourses = [],
    deleteCourse: contextDelete,
    
  } = useCourse();

  // Generic table mode (unchanged)
  const isGeneric = Array.isArray(rows) && Array.isArray(columns);
  if (isGeneric) {
    const rowList = rows;
    return (
      <div className={`bg-white shadow-lg rounded-xl p-5 overflow-x-auto ${className}`}>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowList.map((row, idx) => (
              <tr
                key={row.id || idx}
                className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {col.render ? col.render(row) : row[col.key] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-semibold">
              <td className="py-2 px-4">Total</td>
              <td colSpan={Math.max(1, columns.length - 1)}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }

  // Default course list view — use context courses directly
  const courseList = Array.isArray(contextCourses) ? contextCourses : [];

  // Decide which delete handler to use (prop takes precedence, then context)
  const handleDelete = (id) => {
    if (typeof onDeleteProp === "function") return onDeleteProp(id);
    if (typeof contextDelete === "function") return contextDelete(id);
    // fallback: no-op
    // eslint-disable-next-line no-console
    console.warn("Delete handler not available for course id:", id);
  };

  // If consumer wants to perform updates via a provided callback they can pass onStartEdit.
  // We also expose a tiny convenience for quick update actions using contextUpdate when needed.

  const totalCols = 1 + (showCode ? 1 : 0) + 1 + 1 + 1 + 1 + (showActions ? 1 : 0);
  const leftCols = 1 + (showCode ? 1 : 0);

  return (
    <div className={`bg-white shadow-lg rounded-xl p-5 overflow-x-auto ${className}`}>
      <table className="min-w-full bg-white">
        <thead className="sticky top-0 bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">Course Name</th>
            {showCode && <th className="py-3 px-4 text-left">Course ID</th>}
            <th className="py-3 px-4 text-left">Credit Units</th>
            <th className="py-3 px-4 text-left">Grade</th>
            <th className="py-3 px-4 text-left">Grade Points</th>
            <th className="py-3 px-4 text-left">Semester</th>
            {showActions && <th className="py-3 px-4 text-left">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {courseList.length === 0 && (
            <tr>
              <td className="py-6 px-4 text-center" colSpan={totalCols}>
                No courses yet — add one to get started.
              </td>
            </tr>
          )}

          {courseList.map((course, index) => {
            const isEditing = editingId === course.id;

            if (isEditing && typeof renderRowInputs === "function") {
              return (
                <tr key={course.id}>
                  <td colSpan={totalCols}>{renderRowInputs(course)}</td>
                </tr>
              );
            }

            return (
              <tr
                key={course.id}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
              >
                <td className="py-3 px-4">{course.name}</td>
                {showCode && <td className="py-3 px-4">{course.code || course.id}</td>}
                <td className="py-3 px-4">{course.credits}</td>
                <td className="py-3 px-4 font-semibold">{course.grade}</td>
                <td className="py-3 px-4">{Number(course.gradePoints || 0).toFixed(2)}</td>
                <td className="py-3 px-4">{course.semester || "—"}</td>
                {showActions && (
                  <td className="py-3 px-4">
                    <div className="flex gap-3">
                      {onStartEdit && (
                        <button
                          onClick={() => onStartEdit(course)}
                          className="text-blue-600 text-sm"
                        >
                          Edit
                        </button>
                      )}

                      {/* default delete falls back to context.deleteCourse */}
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="text-red-600 text-sm"
                      >
                        Delete
                      </button>

                     
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr className="bg-gray-100 font-semibold">
            <td className="py-2 px-4" colSpan={leftCols}>
              Total
            </td>
            <td className="py-2 px-4">
              {courseList.reduce((sum, c) => sum + Number(c.credits || 0), 0)}
            </td>
            <td colSpan={Math.max(0, totalCols - leftCols - 1)}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CourseTable;
