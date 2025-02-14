const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Garante que `prisma.product` está disponível
if (!prisma.product) {
  console.error("❌ Prisma product model não está disponível!");
} else {
  console.log("✅ Prisma product model carregado com sucesso!");
}

exports.createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;

  console.log("📌 [LOG] Tentando criar produto com:", { name, description, price, stock });

  try {
    const product = await prisma.product.create({
      data: { name, description, price, stock },
    });

    console.log("✅ [LOG] Produto criado com sucesso:", product);
    res.status(201).json(product);
  } catch (error) {
    console.error("❌ [LOG] Erro ao criar produto:", error.message);
    res.status(400).json({ error: `Error creating product: ${error.message}` });
  }
};

exports.getAllProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: req.params.id },
      data: { name, description, price, stock },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: "Error updating product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting product" });
  }
};
