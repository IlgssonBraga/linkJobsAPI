const { Router } = require("express");
const UserController = require("../app/controllers/UserController");
const SessionController = require("../app/controllers/SessionController");
const ProfileController = require("../app/controllers/ProfileController");
const authMiddleware = require("../app/middlewares/auth");
const FollowController = require("../app/controllers/FollowController");
const AvaliationController = require("../app/controllers/AvaliationController");
const routes = Router();
const sessionController = new SessionController();
const userController = new UserController();
const profileController = new ProfileController();
const followController = new FollowController();
const avaliationController = new AvaliationController();

routes.post("/users", userController.store);
routes.post("/login", sessionController.store);
routes.use(authMiddleware);
routes.get("/profiles", profileController.index);
routes.post("/profiles", profileController.store);
routes.get("/profiles/:id", profileController.show);
routes.delete("/profiles/:id", profileController.delete);
routes.get("/users", userController.index);
routes.get("/users/:id", userController.show);
routes.put("/users/:id", userController.update);
routes.delete("/users/:id", userController.delete);
routes.get("/follows/:id", followController.show);
routes.post("/follows/:id", followController.store);
routes.delete("/follows/:id", followController.delete);
routes.get("/avaliations/:id", avaliationController.show);
routes.post("/avaliations/:id", avaliationController.store);
module.exports = {
  routes,
};
