import React, { useMemo, useState } from "react";
import assignmentData from "../data/assignments.json";
import { useCourse } from "../context/CourseContext";
import CourseTable from "../components/CourseTable";

const Assignments = () => {
  const { courses = [] } = useCourse();
  const [filterStatus, setFilterStatus] = useState("All");
  const [courseFilter, setCourseFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("All");

  // map course id -> course object
  const courseMap = useMemo(
    () => Object.fromEntries(courses.map((c) => [c.id, c])),
    [courses]
  );

  // collect semesters from both courses and assignments
  const semesters = useMemo(() => {
    const s = new Set();
    courses.forEach((c) => c.semester && s.add(String(c.semester)));
    assignmentData.forEach((a) => a.semester && s.add(String(a.semester)));
    return ["All", ...Array.from(s).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))];
  }, [courses]);

  // filter assignments
  const filtered = assignmentData.filter((a) => {
    const course = courseMap[a.courseId];
    const courseName = course?.name || "";
    const courseCode = course?.code || "";

    const assignmentSemester =
      a.semester ?? course?.semester ?? "";

    const courseMatch =
      !courseFilter.trim() ||
      courseName.toLowerCase().includes(courseFilter.toLowerCase()) ||
      courseCode.toLowerCase().includes(courseFilter.toLowerCase());

    const statusMatch = filterStatus === "All" || a.status === filterStatus;
    const idMatch = a.id.toLowerCase().includes(idFilter.toLowerCase());
    const semesterMatch = semesterFilter === "All" || assignmentSemester === semesterFilter;

    return courseMatch && statusMatch && idMatch && semesterMatch;
  });

  // rows & columns for CourseTable
  const rows = filtered.map((a) => {
    const course = courseMap[a.courseId];
    return {
      id: a.id,
      course: course ? `${course.name} (${course.code || course.id})` : a.courseId,
      title: a.title,
      dueDate: a.dueDate,
      semester: a.semester ?? course?.semester ?? "—",
      status: a.status,
    };
  });

  const columns = [
    { key: "id", label: "Assignment ID" },
    { key: "course", label: "Course" },
    { key: "title", label: "Title" },
    { key: "dueDate", label: "Due Date" },
    { key: "semester", label: "Semester" },
    { key: "status", label: "Status" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Assignments</h2>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        {["All", "Completed", "Ongoing"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1 rounded-full border ${
              filterStatus === status ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by Course name or code"
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="border px-3 py-2 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Filter by Assignment ID"
          value={idFilter}
          onChange={(e) => setIdFilter(e.target.value)}
          className="border px-3 py-2 rounded w-1/3"
        />
        <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {semesters.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Reusable CourseTable */}
      <CourseTable rows={rows} columns={columns} className="min-w-full" />
    </div>
  );
};

export default Assignments;
