const express = require("express");
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gerenciamento de pedidos
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Erro na criação do pedido
 */
router.post("/", authMiddleware, orderController.createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Lista todos os pedidos do usuário autenticado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 */
router.get("/", authMiddleware, orderController.getUserOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obtém um pedido pelo ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */
router.get("/:id", authMiddleware, orderController.getOrderById);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Atualiza o status de um pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["Pendente", "Processando", "Enviado", "Entregue"]
 *                 example: "Enviado"
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar o pedido
 */
router.put("/:id", authMiddleware, orderController.updateOrderStatus);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Remove um pedido pelo ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido a ser removido
 *     responses:
 *       200:
 *         description: Pedido removido com sucesso
 *       400:
 *         description: Erro ao remover o pedido
 */
router.delete("/:id", authMiddleware, orderController.deleteOrder);

module.exports = router;
