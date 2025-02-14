const express = require("express");
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Perfume X"
 *               description:
 *                 type: string
 *                 example: "Um perfume exclusivo e marcante"
 *               price:
 *                 type: number
 *                 example: 199.99
 *               stock:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Erro na criação do produto
 */
router.post("/", authMiddleware, productController.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */
router.get("/", productController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtém um produto pelo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get("/:id", productController.getProductById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Perfume Y"
 *               description:
 *                 type: string
 *                 example: "Novo aroma refrescante"
 *               price:
 *                 type: number
 *                 example: 249.99
 *               stock:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar o produto
 */
router.put("/:id", authMiddleware, productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Remove um produto pelo ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto a ser removido
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 *       400:
 *         description: Erro ao remover o produto
 */
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;

