const { Router } = require("express");
const EmployeeController = require("../app/controllers/EmployeeController");
const UserController = require("../app/controllers/UserController");
// const MaterialController = require("../app/controllers/MaterialController");
// const OrderController = require("../app/controllers/OrderController");
const SessionController = require("../app/controllers/SessionController");
const authMiddleware = require("../app/middlewares/auth");
const routes = Router();

const employeeController = new EmployeeController();
const sessionController = new SessionController();
const userController = new UserController();
// const materialController = new MaterialController();
// const orderController = new OrderController();
// routes.get("/", (req,res) => res.send('Main page'))
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

// routes.post("/materials", materialController.store);
// routes.get("/materials", materialController.index);
// routes.get("/materials/:id", materialController.show);
// routes.put("/materials/:id", materialController.update);
// routes.delete("/materials/:id", materialController.delete);

// routes.post("/orders", orderController.store);
// routes.get("/orders", orderController.index);
// routes.get("/orders/:id", orderController.show);
// routes.put("/orders/:id", orderController.update);
// routes.delete("/orders/:id", orderController.delete);

module.exports = {
  routes,
};
