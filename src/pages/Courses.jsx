import React from "react";
import courseData from "../data/courses.json";

const Courses = () => {
  const courses = courseData;

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Courses</h2>
        <p className="text-gray-600">Your enrolled courses and grades</p>
      </div>

      {/* Card Wrapper (matches Dashboard card style) */}
      <div className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="sticky top-0 bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Course Name</th>
              <th className="py-3 px-4 text-left">Course ID</th>
              <th className="py-3 px-4 text-left">Credit Units</th>
              <th className="py-3 px-4 text-left">Grade</th>
              <th className="py-3 px-4 text-left">Grade Points</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr
                key={course.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="py-3 px-4">{course.name}</td>
                <td className="py-3 px-4">{course.id}</td>
                <td className="py-3 px-4">{course.credits}</td>
                <td className="py-3 px-4 font-semibold">{course.grade}</td>
                <td className="py-3 px-4">{course.gradePoints}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-semibold">
              <td className="py-2 px-4" colSpan="2">
                Total
              </td>
              <td className="py-2 px-4">
                {courses.reduce((sum, c) => sum + c.credits, 0)}
              </td>
              <td colSpan="2"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Courses;
