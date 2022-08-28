const { Pizza } = require("../models");

const pizzaController = {
  async getAllPizza(req, res) {
    try {
      const dbPizzaData = await Pizza.find({})
        .populate({
          path: "comments",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 });
      res.json(dbPizzaData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  async getPizzaById(req, res) {
    try {
      const dbPizzaData = await Pizza.findOne({ _id: req.params.id })
        .populate({ path: "comments", select: "-__v" })
        .select("-__v");
      if (!dbPizzaData) {
        res.status(404).json({ message: "No pizza with that ID was found!" });
        return;
      }
      res.json(dbPizzaData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  async createPizza(req, res) {
    try {
      const dbPizzaData = await Pizza.create(req.body);
      res.json(dbPizzaData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updatePizza(req, res) {
    try {
      const dbPizzaData = await Pizza.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!dbPizzaData) {
        res.status(404).json({ message: "No pizza with this id was found" });
        return;
      }
      res.json(dbPizzaData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  async deletePizza(req, res) {
    try {
      const response = await Pizza.findOneAndDelete({ _id: req.params.id });
      if (!response) {
        res.status(404).json({ message: "No pizza with this id was found." });
        return;
      }
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
};

module.exports = pizzaController;
