// src/components/EditCourseForm.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * EditCourseForm
 * Props:
 *  - course: object (id, code, name, credits, grade, gradePoints, semester)
 *  - onCancel: () => void
 *  - onSave: (id, updates) => void
 */
const EditCourseForm = ({ course, onCancel, onSave }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [credits, setCredits] = useState("");
  const [grade, setGrade] = useState("");
  const [gradePoints, setGradePoints] = useState("");
  const [semester, setSemester] = useState("");

  // sync local state when course prop changes
  useEffect(() => {
    if (!course) return;
    setCode(course.code ?? "");
    setName(course.name ?? "");
    setCredits(course.credits ?? "");
    setGrade(course.grade ?? "");
    setGradePoints(course.gradePoints ?? "");
    setSemester(course.semester ?? "");
  }, [course]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name?.trim()) return alert("Provide a course name");

    const updates = {
      code: code?.trim(),
      name: name?.trim(),
      credits: Number(credits || 0),
      grade: grade?.trim(),
      gradePoints: Number(gradePoints || 0),
      semester: semester?.trim(),
    };

    if (typeof onSave === "function") onSave(course.id, updates);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded">
      <div className="grid grid-cols-2 gap-3">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Code (CS101)"
          className="p-2 border rounded"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Course Name"
          className="p-2 border rounded"
          required
        />
        <input
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          placeholder="Credits"
          type="number"
          min="0"
          className="p-2 border rounded"
        />
        <input
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          placeholder="Semester (e.g. Sem 1 / 2024-Fall)"
          className="p-2 border rounded"
        />
        <input
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="Grade (A)"
          className="p-2 border rounded"
        />
        <input
          value={gradePoints}
          onChange={(e) => setGradePoints(e.target.value)}
          placeholder="Grade Points (4.0)"
          type="number"
          step="0.01"
          min="0"
          className="p-2 border rounded"
        />
      </div>

      <div className="mt-3 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Save
        </button>
      </div>
    </form>
  );
};

EditCourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};

export default EditCourseForm;
