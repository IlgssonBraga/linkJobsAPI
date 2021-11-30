const { Router } = require("express");
const EmployeeController = require("../app/controllers/EmployeeController");
const UserController = require("../app/controllers/UserController");
const SessionController = require("../app/controllers/SessionController");
const ServiceController = require("../app/controllers/ServiceController");
const authMiddleware = require("../app/middlewares/auth");
const routes = Router();

const employeeController = new EmployeeController();
const sessionController = new SessionController();
const userController = new UserController();
const serviceController = new ServiceController();

routes.post("/employees", employeeController.store);
routes.post("/login", sessionController.store);
routes.use(authMiddleware);
routes.get("/employees", employeeController.index);
routes.get("/employees/:id", employeeController.show);
routes.put("/employees/:id", employeeController.update);
routes.delete("/employees/:id", employeeController.delete);

routes.post("/users", userController.store);
routes.get("/users", userController.index);
routes.get("/users/:id", userController.show);
routes.put("/users/:id", userController.update);
routes.delete("/users/:id", userController.delete);

routes.post("/services", serviceController.store);
routes.get("/services", serviceController.index);
routes.get("/services/:id", serviceController.show);
routes.put("/services/:id", serviceController.update);
routes.delete("/services/:id", serviceController.delete);



module.exports = {
  routes,
};
