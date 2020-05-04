import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import color from "../views/Color.vue";
import Design from "../views/Design.vue";
import Fabric from "../views/Fabric.vue";
import Stitching from "../views/Stitching.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/logout.vue";
import Profile from "../views/Profile.vue";
import AddShipment from "../views/AddShipment.vue"
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/color",
    name: "Color",
    component: color,
    meta:{
      requiresAdmin:true
    }
  },
  {
    path: "/design",
    name: "Design",
    component: Design,
    meta:{
      requiresAdmin:true
    }
  },
  {
    path: "/Fabric",
    name: "Fabric",
    component: Fabric,
    meta:{
      requiresAdmin:true
    }
  },
  {
    path: "/stitching",
    name: "Stitching",
    component: Stitching,
    meta:{
      requiresAdmin:true
    }
  },
  {
    path: "/Signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/Login",
    name: "Login",
    component: Login
  },
  {
    path: "/Logout",
    name: "Logout",
    component: Logout
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/Shipment/Add",
    name: "AddShipment",
    component: AddShipment
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.IsLoggedIn) {
      next(false)
    } else {
      next()
    }
  }
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.User.IsAdmin) {
      next(false)
    } else {
      next()
    }
  }
   else {
    next() // make sure to always call next()!
  }
})
export default router;
