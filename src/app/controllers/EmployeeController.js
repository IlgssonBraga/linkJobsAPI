const Employee = require("../models/Employee");

class EmployeeController {
  async index(req, res) {
    const employee = await Employee.findAll();

    return res.json(employee);
  }

  async show(req, res) {
    const id = req.params.id;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not find" });
    }
    return res.json(employee);
  }

  async store(req, res) {
    console.log("BODY", req.body);
    const { email } = req.body;
    const verificaEmail = await Employee.findOne({ where: { email } });
    console.log("verificaEmail", verificaEmail);
    if (verificaEmail) {
      return res.status(400).json({ error: "E-mail already exists." });
    }
    const employee = await Employee.create(req.body);
    return res.json({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      createdAt: employee.createdAt,
    });
  }

  async update(req, res) {
    const { email } = req.body;
    const employee = await Employee.findByPk(req.params.id);

    if (email && email !== employee.email) {
      const verificaEmail = await Employee.findOne({ where: { email } });
      if (verificaEmail) {
        return res.status(400).json({ error: "E-mail already exists." });
      }
    }

    await employee.update(req.body);

    const employeeUpdated = await Employee.findByPk(req.params.id);

    return res.json(employeeUpdated);
  }

  async delete(req, res) {
    const id = req.params.id;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not find" });
    }

    employee.destroy();
    return res.status(204).json();
  }
}

module.exports = EmployeeController;
