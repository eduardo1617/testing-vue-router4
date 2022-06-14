import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store.js";

const router = createRouter({
  mode: "history",
  linkExactActiveClass: "vue-school-active-class",
  history: createWebHistory(import.meta.env.BASE_URL),
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     const position = {};
  //     if (to.hash) {
  //       position.selector = to.hash;
  //       if (to.hash === "#experience") {
  //         position.offset = { y: 140 };
  //       }
  //       if (document.querySelector(to.hash)) {
  //         return position;
  //       }

  //       return false;
  //     }
  //   }
  // },
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
  },
  routes: [
    {
      path: "/",
      name: "home",
      props: true,
      component: HomeView,
    },
    {
      path: "/destination/:slug",
      name: "DestinationDetails",
      props: true,
      component: () => import("../views/DestinationDetails.vue"),
      children: [
        {
          path: ":experienceSlug",
          name: "experienceDetails",
          props: true,
          component: () => import("../views/ExperienceDetails.vue"),
        },
      ],
      beforeEnter: (to, from, next) => {
        const exists = store.destinations.find(
          (destination) => destination.slug === to.params.slug
        );
        if (exists) {
          next();
        } else {
          next({ name: "notFound" });
        }
      },
    },
    {
      path: "/user",
      name: "user",
      component: () => import("../views/UserView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/invoices",
      name: "invoices",
      component: () => import("../views/InvoicesView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/404",
      alias: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.user) {
      next({
        name: "login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
