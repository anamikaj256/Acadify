
import React, { useState } from "react";
import { useCourse } from "../context/CourseContext";

const AddCourse = ({ onAdded, onClose }) => {
  const { addCourse } = useCourse();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [credits, setCredits] = useState("");
  const [grade, setGrade] = useState("");
  const [gradePoints, setGradePoints] = useState("");
  const [semester, setSemester] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      return alert("Provide a course name");
    }

    const newCourse = addCourse({
      code,
      name,
      credits: Number(credits || 0),
      grade,
      gradePoints: Number(gradePoints || 0),
      semester,
    });

    // reset form
    setCode("");
    setName("");
    setCredits("");
    setGrade("");
    setGradePoints("");
    setSemester("");

    // call optional callbacks so parent can close modal / react
    if (typeof onAdded === "function") {
      try { onAdded(newCourse); } catch (err) { /* swallow */ }
    }
    if (typeof onClose === "function") {
      try { onClose(); } catch (err) { /* swallow */ }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl p-4 bg-white rounded-lg shadow">
      <h3 className="font-semibold text-lg mb-3">Add Course</h3>
      <div className="grid grid-cols-2 gap-3">
        <input value={code} onChange={(e)=>setCode(e.target.value)} placeholder="Code (CS101)" className="p-2 border rounded"/>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Course Name" className="p-2 border rounded" required/>
        <input value={credits} onChange={(e)=>setCredits(e.target.value)} placeholder="Credits" type="number" className="p-2 border rounded"/>
        <input value={semester} onChange={(e)=>setSemester(e.target.value)} placeholder="Semester (e.g. Sem 1 / 2024-Fall)" className="p-2 border rounded"/>
        <input value={grade} onChange={(e)=>setGrade(e.target.value)} placeholder="Grade (A)" className="p-2 border rounded"/>
        <input value={gradePoints} onChange={(e)=>setGradePoints(e.target.value)} placeholder="Grade Points (4.0)" type="number" step="0.01" className="p-2 border rounded"/>
      </div>
      <div className="mt-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Course</button>
      </div>
    </form>
  );
};

export default AddCourse;
