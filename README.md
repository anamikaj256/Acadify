# Acadify — Student Dashboard (React)

Short description

Acadify is a responsive React-based student dashboard UI that matches the provided UI sketch. It implements a sidebar-driven layout where the main content area renders different pages (Dashboard/Home, Courses, CGPA, Assignments) based on sidebar selection. The NavBar shows a breadcrumb that reflects the sidebar selection and a top-right user dropdown with actions (Change Password, Edit Personal Data, Logout). The app uses local storage for simple persistence and React Context for global state.


## Features

1. Main Content Area — Renders the currently selected page from the sidebar (Dashboard, Courses, CGPA, Assignments, etc.).
2. Breadcrumb — NavBar displays the breadcrumb derived from the sidebar selection (e.g., `Home`, `Home / Courses`).
3. User Dropdown — Top-right user icon shows a dropdown with `Change Password`, `Edit Personal Data`, and `Logout` actions.
4. Dashboard Widgets — Clicking `Dashboard` shows widgets in the main content area (summary cards, charts, quick actions) per the UI sketch.
5. Courses Page — Displays a table of courses with columns: `Course Name`, `Course Id`, `Credit Units`, `Student Grade`, `Grade Points`.
6. CGPA Calculator— Calculates  CGPA based on the courses completed so far. 
7. Assignments Page — Renders `Completed` and `Ongoing` assignments for the current semester with filter controls for `course id` and `assignment id`.


## Tech stack

* **React** (V18+)
* **React Router** (routing & breadcrumbs)
* **Tailwind CSS** (styling)
* **React Context API** (UserContext, SidebarContext)
* **localStorage** (persist preferences & session data)
* **React Table or simple HTML table** (Courses)

## Quick start (local)

### Prerequisites

* Node.js (16+)
* npm or yarn

### Clone & install

```bash
# clone
git clone <https://github.com/anamikaj256/Acadify.git>
cd <Acadify>

# install dependencies
npm install
# or
# yarn


### Run in development

```bash
npm start
# opens at http://localhost:3000

### Build for production

bash
npm run build


## Project structure (suggested)


edu-dash/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   ├── UserMenu.jsx
│   │   └── PrivateRoute.jsx
│   ├── context/
│   │   ├── UserContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Courses.jsx
│   │   ├── CGPA.jsx
│   │   └── Assignments.jsx
│   ├── data/
│   │   ├── courses.json
│   │   └── assignments.json
│   ├── App.jsx
│   └── index.jsx
├── package.json
└── README.md


## Important implementation details

### Routing & Breadcrumbs

* Use `react-router-dom` to map routes to pages: `/`, `/courses`, `/cgpa`, `/assignments`.
* Breadcrumb reads the current route or the active sidebar selection and renders like `Home` or `Home / Courses`.

### State management

* UserContext: stores `user` object, auth state, and actions: `login`, `logout`, `changePassword`, `editProfile`.
* SidebarContext: stores currently selected sidebar item so multiple components (Navbar, Main) can read it.
* Persist user preferences and last active route to `localStorage` so the app restores state on reload.

### Courses data format

Sample `courses.json` entry:

json
{
  "courseId": "CS101",
  "courseName": "Intro to Computer Science",
  "creditUnits": 3,
  "studentGrade": "A",
  "gradePoints": 9
}



### Assignments filters & layout

* Table or list grouped by status (`Ongoing`, `Completed`).
* Filters: search or select by `courseId` and `assignmentId`.


### User dropdown actions

* Change password: simple page that validates password & updates UserContext (mocked for frontend-only).
* Edit personal data:  page with form fields kept in `UserContext` and stored to `localStorage`.
* Logout: clears user session in context and localStorage.



## Accessibility & Responsiveness

* Sidebar collapses to icons on smaller screens.
* Navbar remains sticky with breadcrumb & user dropdown accessible on mobile.



## Deployment

* Build with `npm run build` and host on any static host ( Vercel, GitHub Pages).
* For GitHub Pages, use `gh-pages` package and set homepage in `package.json`.



## Future enhancements

* Backend integration (Node/Express) to persist users, courses, assignments
* Authentication with JWT and real API
* Real-time updates for assignments (websockets)
* Analytics & reports export (CSV/PDF)



## Contributing

Contributions are welcome — fork the repo, create a branch, and open a pull request. Please add tests for new features.

