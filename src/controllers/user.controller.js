const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se o e-mail já está cadastrado
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "Usuário registrado com sucesso", user });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ error: "Erro interno ao registrar usuário" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Tentando login com:", email, password); // 👈 LOG PARA DEPURAÇÃO

    // Busca o usuário pelo e-mail
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log("Usuário não encontrado no banco!");
      return res.status(400).json({ error: "Credenciais inválidas" });
    }

    console.log("Usuário encontrado:", user);

    // Compara a senha digitada com a senha criptografada do banco
    const validPassword = await bcrypt.compare(password, user.password);
    console.log("Senha correta?", validPassword); // 👈 LOG PARA VERIFICAR A COMPARAÇÃO

    if (!validPassword) {
      return res.status(400).json({ error: "Credenciais inválidas" });
    }

    // Gera um token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ error: "Erro interno ao fazer login" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro interno ao buscar usuários" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    res.status(500).json({ error: "Erro interno ao buscar usuário" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: { name, email },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(400).json({ error: "Erro ao atualizar usuário" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(400).json({ error: "Erro ao excluir usuário" });
  }
};


