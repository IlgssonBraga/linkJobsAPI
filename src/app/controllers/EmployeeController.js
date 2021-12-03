const Employee = require("../models/Employee");

class EmployeeController {
  async index(req, res) {
    const employee = await Employee.findAll({
      attributes: {
        exclude: ["password_hash"],
      },
    });

    return res.json(employee);
  }

  async show(req, res) {
    const id = req.params.id;
    // const employee = await Employee.findOne(id, {
    //   attributes: {
    //     exclude: ["password_hash"],
    //   },
    // });

    const employee = await Employee.findOne({ where: { id:  req.params.id}, attributes: {
      exclude: ["password_hash"],
    } });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.json(employee);
  }

  async store(req, res) {
    const { email } = req.body;
    const verificaEmail = await Employee.findOne({ where: { email } });
    if (verificaEmail) {
      return res.status(400).json({ error: "E-mail already exists." });
    }
    await Employee.create(req.body);

    const newEmployee = await Employee.findOne({ where: { email }, attributes: {
      exclude: ["password_hash"],
    }});
    return res.json(newEmployee);
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

    const employeeUpdated = await Employee.findOne({ where: { id: req.params.id }, attributes: {
      exclude: ["password_hash"],
    }});

    return res.json(employeeUpdated);
  }

  async delete(req, res) {
    const id = req.params.id;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.destroy();
    return res.status(204).json();
  }
}

module.exports = EmployeeController;
