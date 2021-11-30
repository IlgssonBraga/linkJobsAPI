const Contract = require("../models/Contract");
const User = require("../models/User");

class ContractController {
  async index(req, res) {
    const contracts = await Contract.findAll();

    return res.json(contracts);
  }

  async show(req, res) {
    const id = req.params.id;
    const contract = await Contract.findByPk(id);
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }
    return res.json(contract);
  }

  async store(req, res) {
    const { provider_id, customer_id } = req.body;

    const verificaProvider = await User.findByPk(provider_id);
    if (!verificaProvider) {
      return res.status(404).json({ error: "Provider not found" });
    }

    const verificaCustomer = await User.findByPk(customer_id);
    if (!verificaCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const contract = await Contract.create(req.body);
    return res.json(contract);
  }

  async update(req, res) {
    const { provider_id, customer_id } = req.body;
    const contract = await Contract.findByPk(req.params.id);

    if (!contract) {
      return res.status(404).json({ error: "Contract not found" });
    }

    const verificaProvider = await User.findByPk(provider_id);
    if (!verificaProvider) {
      return res.status(404).json({ error: "Provider not found" });
    }

    const verificaCustomer = await User.findByPk(customer_id);
    if (!verificaCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    await contract.update(req.body);

    const contractUpdated = await Contract.findByPk(req.params.id);

    return res.json(contractUpdated);
  }

  async delete(req, res) {
    const id = req.params.id;
    const contract = await Contract.findByPk(id);
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    contract.destroy();
    return res.status(204).json();
  }
}

module.exports = ContractController;
