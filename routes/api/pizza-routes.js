const router = require("express").Router();
const pizzaController = require("../../controllers/pizza-controller");

router.get("/", pizzaController.getAllPizza);
router.post("/", pizzaController.createPizza);

router.get("/:id", pizzaController.getPizzaById);
router.put("/:id", pizzaController.updatePizza);
router.delete("/:id", pizzaController.deletePizza);

module.exports = router;
