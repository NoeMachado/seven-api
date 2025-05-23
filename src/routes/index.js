const express = require("express");

const userRoutes = require("./user.routes");
const productRoutes = require("./product.routes");
const orderRoutes = require("./order.routes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
