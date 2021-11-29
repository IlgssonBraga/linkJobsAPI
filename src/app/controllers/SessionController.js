const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");
const authConfig = require("../../config/auth");

class SessionControler {
  async store(req, res) {
    const { email, password } = req.body;
    const employee = await Employee.findOne({
      where: { email },
    });
    if (!employee) {
      return res.status(401).json({ error: "Employee not found." });
    }

    if (!(await employee.checkPassword(password))) {
      return res.status(401).json({ error: "Password does not match." });
    }
    const { id, name } = employee;
    const rep = {
      employee: {
        id,
        name,
        email,
      },
      token: await jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    };

    return res.json(rep);
  }
}

module.exports = SessionControler;
