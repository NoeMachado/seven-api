const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.createOrder = async (req, res) => {
  const { products } = req.body;
  const userId = req.user.id;

  try {
    const total = await calculateTotal(products);

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: "Pendente",
        items: {
          create: products.map(({ productId, quantity }) => ({
            productId,
            quantity,
          })),
        },
      },
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: "Error creating order" });
  }
};

exports.getUserOrders = async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user.id },
    include: { items: true },
  });
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: req.params.id },
    include: { items: true },
  });
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: "Error updating order status" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await prisma.order.delete({ where: { id: req.params.id } });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting order" });
  }
};

async function calculateTotal(products) {
  const productList = await prisma.product.findMany({
    where: { id: { in: products.map(p => p.productId) } },
  });

  return products.reduce((total, { productId, quantity }) => {
    const product = productList.find(p => p.id === productId);
    return total + (product ? product.price * quantity : 0);
  }, 0);
}
