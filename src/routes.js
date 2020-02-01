/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.jsx";
import Profile from "views/examples/Profile.jsx";
import Maps from "views/examples/Maps.jsx";
// import Register from "views/examples/Register.jsx";
// import Login from "views/examples/Login.jsx";
// import Tables from "views/examples/Tables.jsx";
import Pis from "views/examples/Pis.jsx";
import Manage from "views/examples/Manage.jsx";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    shown: true
  },
  {
    path: "/icons",
    name: "Pis",
    icon: "ni ni-tablet-button text-blue",
    component: Pis,
    layout: "/admin",
    shown: true
  },
  {
    path: "/maps",
    name: "Logs",
    icon: "ni ni-bullet-list-67 text-orange",
    component: Maps,
    layout: "/admin",
    shown: true
  },
  {
    path: "/manage/:address",
    name: "Manage",
    icon: "ni ni-bullet-list-67 text-orange",
    component: Manage,
    layout: "/admin",
    shown: false
  },
  {
    path: "/user-profile",
    name: "Check In",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    shown: false
  }/*,
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  } */
];
export default routes;
