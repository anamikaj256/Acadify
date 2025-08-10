import courseData from "../data/courses.json";

const CGPA = () => {
  const courses = courseData;

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

  const totalGradePoints = courses.reduce(
    (sum, course) => sum + course.credits * course.gradePoints,
    0
  );

  const cgpa =
    totalCredits === 0 ? 0 : (totalGradePoints / totalCredits).toFixed(2);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">CGPA Calculator</h2>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 max-w-md mx-auto text-center">
        <p className="text-lg text-gray-500 mb-3">
          Based on completed courses
        </p>
        <p className="text-4xl font-extrabold text-blue-600">{cgpa}</p>
        <p className="text-sm text-gray-400 mt-2">
          CGPA = Total Grade Points ÷ Total Credits
        </p>
      </div>
    </div>
  );
};

export default CGPA;
