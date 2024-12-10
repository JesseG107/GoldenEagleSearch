import { createRouter, createWebHistory } from "vue-router";

// HelloWorld is a Homepage with a logo [ 'tried changing filename to Home.vue but it broke my entire application :(' ]
import Home from "../components/Home.vue";
//import HelloWorld from "../components/HelloWorld.vue";

import About from "../components/About.vue";

// From Older Merged
import Search from "../components/Search.vue";

// Testing pages
import StudentRegister from "../components/StudentRegister.vue";
import ProfessorRegister from "../components/ProfessorRegister.vue";
import StudentProfile from "../components/StudentProfile.vue";
import ProfessorProfile from "../components/ProfessorProfile.vue";
import StudentLogin from "../components/StudentLogin.vue";
import ProfessorLogin from "../components/ProfessorLogin.vue";
import AfterLoginHomeProfessor from "../components/AfterLoginHomeProfessor.vue";
import AfterLoginHomeStudent from "../components/AfterLoginHomeStudent.vue";
import ProfessorsAll from "../components/Professors.vue";
import CoursesAll from "../components/Courses.vue";
import Professor from "../components/Professor.vue";
import Course from "../components/Course.vue";
//Review Pages
import ReviewForm from "../components/ReviewForm.vue";
import ReviewList from "../components/ReviewList.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/home", component: Home },
  { path: "/search", name: "SearchResults", component: Search },
  { path: "/register/student", component: StudentRegister },
  { path: "/register/professor", component: ProfessorRegister },
  { path: "/profile/student/:id", component: StudentProfile },
  { path: "/profile/professor/:id", component: ProfessorProfile },
  { path: "/students/login", component: StudentLogin },
  { path: "/professors/login", component: ProfessorLogin },
  { path: "/afterloginhomestudent", component: AfterLoginHomeStudent },
  { path: "/afterloginhomeprofessor", component: AfterLoginHomeProfessor },
  { path: "/reviews/add", component: ReviewForm }, // Add a review
  { path: "/reviews", component: ReviewList },
  { path: "/professorsAll", component: ProfessorsAll },
  { path: "/coursesAll", component: CoursesAll },
  { path: "/professor/:id", name: "Professor", component: Professor },
  { path: "/course/:id", name: "Course", component: Course },
  {}
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
