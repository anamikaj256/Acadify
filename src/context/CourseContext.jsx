
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid"; 

const CourseContext = createContext();

const initialState = {
  courses: [],
};

const ACTIONS = {
  SET_COURSES: "SET_COURSES",
  ADD_COURSE: "ADD_COURSE",
  UPDATE_COURSE: "UPDATE_COURSE",
  DELETE_COURSE: "DELETE_COURSE",
};

function courseReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_COURSES:
      return { ...state, courses: action.payload };
    case ACTIONS.ADD_COURSE:
      return { ...state, courses: [...state.courses, action.payload] };
    case ACTIONS.UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload.updates } : c
        ),
      };
    case ACTIONS.DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter((c) => c.id !== action.payload),
      };
    default:
      return state;
  }
}

export const CourseProvider = ({ children, initialCourses = null }) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  

  useEffect(() => {
  const saved = localStorage.getItem("courses");
  try {
    const parsed = saved && JSON.parse(saved);
    const isValidSaved = Array.isArray(parsed) && parsed.length > 0;
    if (isValidSaved) {
      dispatch({ type: ACTIONS.SET_COURSES, payload: parsed });
      return;
    }
  } catch (err) {
    console.warn("Invalid saved courses, ignoring");
  }

  // Fallback to seed
  if (initialCourses && Array.isArray(initialCourses)) {
    const prepared = initialCourses.map((c) => ({
      id: c.id || uuidv4(),
      code: c.code || "",
      name: c.name || "Untitled",
      credits: Number(c.credits || 0),
      grade: c.grade || "",
      gradePoints: Number(c.gradePoints || 0),
      semester: c.semester || "",
    }));
    dispatch({ type: ACTIONS.SET_COURSES, payload: prepared });
  }
}, [initialCourses]);

  // persist
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(state.courses));
  }, [state.courses]);

  // helper actions
  const addCourse = (course) => {
    const newCourse = {
      id: course.id || uuidv4(),
      code: course.code || "",
      name: course.name,
      credits: Number(course.credits || 0),
      grade: course.grade || "",
      gradePoints: Number(course.gradePoints || 0),
      semester: course.semester || "",
    };
    dispatch({ type: ACTIONS.ADD_COURSE, payload: newCourse });
    return newCourse;
  };

  const updateCourse = (id, updates) =>
    dispatch({ type: ACTIONS.UPDATE_COURSE, payload: { id, updates } });

  const deleteCourse = (id) => dispatch({ type: ACTIONS.DELETE_COURSE, payload: id });

  return (
    <CourseContext.Provider
      value={{
        courses: state.courses,
        dispatch,
        addCourse,
        updateCourse,
        deleteCourse,
        ACTIONS,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => useContext(CourseContext);
