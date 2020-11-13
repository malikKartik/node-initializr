const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controllers.js");

router.get("/", orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post("/", orderController.createOrder);
router.delete("/:id", orderController.deleteOrderById);
router.patch("/:id", orderController.updateOrder);

module.exports = router;