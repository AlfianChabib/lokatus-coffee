import { PrismaClient, Role } from "@prisma/client";
import quotes from "./quotes.json";
import { hashPassword } from "../src/common/server/password";

const prisma = new PrismaClient();

const adminSeed = [
  { username: "superadmin", password: "superadmin", role: "SUPER_ADMIN" },
  { username: "admin", password: "admin", role: "ADMIN" },
] satisfies { username: string; password: string; role: Role }[];

async function main() {
  const quote = quotes.map(async (quote) => {
    return await prisma.quote.createMany({
      data: {
        content: quote.content,
        author: quote.author,
        mood: quote.mood === "happy" ? "HAPPY" : "SAD",
        isActive: true,
        canShow: true,
      },
    });
  });

  const admin = adminSeed.map(async (user) => {
    return await prisma.user.create({
      data: { username: user.username, password: hashPassword(user.password), role: user.role },
    });
  });

  Promise.all([admin, quote]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
