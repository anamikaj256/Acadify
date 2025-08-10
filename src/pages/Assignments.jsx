import { useState } from "react";
import assignmentData from "../data/assignments.json";

const Assignments = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [courseFilter, setCourseFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");

  const filtered = assignmentData.filter((a) => {
    return (
      (filterStatus === "All" || a.status === filterStatus) &&
      a.courseId.toLowerCase().includes(courseFilter.toLowerCase()) &&
      a.id.toLowerCase().includes(idFilter.toLowerCase())
    );
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Assignments</h2>

      {/* Status Filter */}
      <div className="flex gap-3 mb-4">
        {["All", "Completed", "Ongoing"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1 rounded-full border transition-colors duration-200 shadow-sm ${
              filterStatus === status
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 hover:bg-gray-100 border-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Input Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by Course ID"
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-1/3"
        />
        <input
          type="text"
          placeholder="Filter by Assignment ID"
          value={idFilter}
          onChange={(e) => setIdFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-1/3"
        />
      </div>

      {/* Assignment Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="px-4 py-3">Assignment ID</th>
              <th className="px-4 py-3">Course ID</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr
                key={a.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">{a.id}</td>
                <td className="px-4 py-3">{a.courseId}</td>
                <td className="px-4 py-3">{a.title}</td>
                <td className="px-4 py-3">{a.dueDate}</td>
                <td
                  className={`px-4 py-3 font-medium ${
                    a.status === "Completed"
                      ? "text-green-600"
                      : a.status === "Ongoing"
                      ? "text-yellow-600"
                      : "text-gray-600"
                  }`}
                >
                  {a.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignments;
