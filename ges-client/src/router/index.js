import { createRouter, createWebHistory } from 'vue-router';

// HelloWorld is a Homepage with a logo [ 'tried changing filename to Home.vue but it broke my entire application :(' ]
import Home from '../components/Home.vue'; 

import About from '../components/About.vue';

import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import Profile from '../components/Profile.vue'
import Course from '../components/Course.vue'
import Professor from '../components/ProfessorView.vue'
import Search from '../components/Search.vue'

const routes = [
    { path: '/', component: Home }, 
    { path: '/about', component: About },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/profile/:id', component: Profile },
    { path: '/home', component: Home },
    { path: '/course', component: Course },
    { path: '/professor', component: Professor },
    { path: '/search', component: Search}
]

const router = createRouter({
    routes, 
    history: createWebHistory()
});

export default router;