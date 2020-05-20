import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Edit from "../views/Edit.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Verification from "../views/Verification.vue";
import Preview from "../views/Preview.vue";
import BasicTemplate from "@/templates/Basic.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/edit",
    name: "EditUser",
    component: Edit,
    children: [
      {
        path: "preview",
        component: Preview,
        children: [
          {
            path: "basic",
            component: BasicTemplate
          }
        ]
      }
    ]
  },
  {
    path: "/edit/guest",
    name: "EditGuest",
    component: Edit,
    children: [
      {
        path: "preview",
        component: Preview,
        children: [
          {
            path: "basic",
            component: BasicTemplate
          }
        ]
      }
    ]
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/verify",
    name: "Verification",
    component: Verification
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
