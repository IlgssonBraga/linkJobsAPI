const Service = require("../models/Service");
const User = require("../models/User");

class ServiceController {
  async index(req, res) {
    const services = await Service.findAll();

    return res.json(services);
  }

  async show(req, res) {
    const id = req.params.id;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not find" });
    }
    return res.json(service);
  }

  async store(req, res) {
    const { provider_id } = req.body;

    const verificaProvider = await User.findByPk(provider_id);
    if (!verificaProvider) {
      return res.status(404).json({ error: "Provider not found" });
    }

    const service = await Service.create(req.body);
    return res.json(service);
  }

  async update(req, res) {
    const { provider_id } = req.body;
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const verificaProvider = await User.findByPk(provider_id);
    if (!verificaProvider) {
      return res.status(404).json({ error: "Provider not found" });
    }
    await service.update(req.body);

    const serviceUpdated = await Service.findByPk(req.params.id);

    return res.json(serviceUpdated);
  }

  async delete(req, res) {
    const id = req.params.id;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    service.destroy();
    return res.status(204).json();
  }
}

module.exports = ServiceController;
