import express from "express";

const router = express.Router();

// Define routes
const moduleRoutes = [
  {
    path: "/test",
    route: router,
  },
];

// Mapping routes
moduleRoutes?.forEach((route) => router.use(route?.path, route?.route));

export default router;
