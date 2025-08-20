import React, { useState } from "react";
import { useCourse } from "../context/CourseContext";
import CourseTable from "../components/CourseTable";

const CGPA = () => {
  const { courses = [] } = useCourse();
  const [semesterFilter, setSemesterFilter] = useState("All");

  // Get unique semesters
  const semesters = ["All", ...Array.from(new Set(courses.map((c) => c.semester).filter(Boolean)))];

  // Filter courses by semester
  const visibleCourses = courses.filter(
    (c) => semesterFilter === "All" || c.semester === semesterFilter
  );

  // Compute CGPA only for courses with numeric credits and gradePoints
  const totalCredits = visibleCourses.reduce((sum, c) => {
    const credit = Number(c.credits);
    return !isNaN(credit) ? sum + credit : sum;
  }, 0);

  const totalGradePoints = visibleCourses.reduce((sum, c) => {
    const credit = Number(c.credits);
    const gp = Number(c.gradePoints);
    return !isNaN(credit) && !isNaN(gp) ? sum + credit * gp : sum;
  }, 0);

  const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "0.00";

  // Updated table columns to match Courses page
  const columns = [
    { key: "name", label: "Course Name" },
    { key: "code", label: "Course ID" },
    { key: "credits", label: "Credits" },
    { key: "grade", label: "Grade" },
    { key: "gradePoints", label: "Grade Points" },
    { key: "semester", label: "Semester" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">CGPA Calculator</h2>

      {/* Semester Filter */}
      <div className="mb-4">
        <label className="mr-2">Filter semester:</label>
        <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          className="border p-2 rounded"
        >
          {semesters.map((s) => (
            <option key={s} value={s}>
              {s || "Unspecified"}
            </option>
          ))}
        </select>
      </div>

      {/* CGPA Display */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 max-w-md mx-auto text-center mb-6">
        <p className="text-lg text-gray-500 mb-3">Based on visible courses</p>
        <p className="text-4xl font-extrabold text-blue-600">{cgpa}</p>
        <p className="text-sm text-gray-400 mt-2">CGPA = Total Grade Points ÷ Total Credits</p>
      </div>

      {/* Course Table */}
      <CourseTable rows={visibleCourses} columns={columns} />
    </div>
  );
};

export default CGPA;
