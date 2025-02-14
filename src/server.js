const app = require("./app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  try {
    await prisma.$connect();
    console.log("🗄 Database connected");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
});
