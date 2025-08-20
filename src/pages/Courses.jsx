import React, { useState, useEffect, useRef } from "react";
import { useCourse } from "../context/CourseContext";
import AddCourse from "../pages/AddCourse";
import CourseTable from "../components/CourseTable"; 
import EditCourseForm from "../components/EditCourseForm";

const Courses = () => {
  const { courses = [], updateCourse, deleteCourse } = useCourse();

  // modal + edit state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const prevCountRef = useRef(Array.isArray(courses) ? courses.length : 0);

  useEffect(() => {
    const newLen = Array.isArray(courses) ? courses.length : 0;
    // auto-close add modal if courses length increased
    if (newLen > prevCountRef.current) {
      setShowAddModal(false);
    }
    prevCountRef.current = newLen;
  }, [courses]);

  // Confirm & delete
  const handleDelete = (id) => {
    if (!id) return;
    if (window.confirm("Delete this course?")) {
      deleteCourse(id);
      if (editingId === id) setEditingId(null);
    }
  };

  // Start editing: CourseTable calls this with the course object
  const handleStartEdit = (course) => {
    if (!course) return;
    setEditingId(course.id);
  };

  // Render editing UI for a row (passed to CourseTable)
  const renderRowInputs = (course) => {
    if (!course) return null;
    return (
      <EditCourseForm
        key={`edit-${course.id}`}
        course={course}
        onCancel={() => setEditingId(null)}
        onSave={(id, updates) => {
          updateCourse(id, updates);
          setEditingId(null);
        }}
      />
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-left">
          <h2 className="text-3xl font-bold text-gray-900">Courses</h2>
          <p className="text-gray-600">Your enrolled courses and grades</p>
        </div>

        <div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Course
          </button>
        </div>
      </div>

      {/* CourseTable — no `rows` prop so it reads courses from context */}
      <CourseTable
        editingId={editingId}
        onStartEdit={handleStartEdit}
        onDelete={handleDelete} // optional; CourseTable will fallback to context.deleteCourse if omitted
        renderRowInputs={renderRowInputs}
        showActions={true}
        showCode={true}
        className="mb-6"
      />

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowAddModal(false)}
            aria-hidden
          />

          {/* modal content */}
          <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 z-10">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-lg font-semibold">Add Course</h4>
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setShowAddModal(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* AddCourse calls context.addCourse and triggers onAdded/onClose callbacks */}
            <AddCourse
              onAdded={() => setShowAddModal(false)}
              onClose={() => setShowAddModal(false)}
            />

            <div className="mt-4 text-right">
              <button
                className="text-sm text-gray-500"
                onClick={() => setShowAddModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
